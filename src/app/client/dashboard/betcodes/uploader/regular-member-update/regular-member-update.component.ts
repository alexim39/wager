import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BetcodesInterface, BetcodesService } from '../../betcodes.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ServerResponse } from 'src/app/common/server/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdaterDialogComponent } from './updater-dialog/updater-dialog.component';

@Component({
  selector: 'async-regular-member-update',
  template: `
    <!-- active subscription -->
    <aside >
      <div *ngIf="betcodesService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <span>Loading...</span>
      </div>
      <section *ngIf="!(betcodesService.showSpinner | async)">
        <div class="filter mat-elevation-z8">
          <mat-form-field>
            <mat-label>Search Table</mat-label>
            <input matInput (keyup)="applyFilter($event)" #input>
          </mat-form-field>
        </div>
        <table mat-table [dataSource]="betcodes" matSort class="mat-elevation-z8">

          <ng-container matColumnDef="bookmaker">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> BOOKMAKER </th>
            <td mat-cell *matCellDef="let bet">
              <!-- <img [src]="bookmakerLogo"/> --> {{bet.bookmaker | titlecase}} 
            </td>
          </ng-container>

          <ng-container matColumnDef="code">
            <th mat-header-cell *matHeaderCellDef> CODE </th>
            <td mat-cell *matCellDef="let bet"> {{bet.code}} </td>
          </ng-container>

          <ng-container matColumnDef="odd">
            <th mat-header-cell *matHeaderCellDef> ODD </th>
            <td mat-cell *matCellDef="let bet"> &#8776;{{bet.odd}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> STATUS </th>
            <td mat-cell *matCellDef="let bet"> {{bet.status | sentencecase}} </td>
          </ng-container>

          <ng-container matColumnDef="createDate">
            <th mat-header-cell *matHeaderCellDef> UPLOAD DATE </th>
            <td mat-cell *matCellDef="let bet"> {{bet.createDate | date}} </td>
          </ng-container>

          <ng-container matColumnDef="outcome">
            <th mat-header-cell *matHeaderCellDef> OUTCOME </th>
            <td mat-cell *matCellDef="let bet"> {{bet.outcome | titlecase}} </td>
          </ng-container>

          <ng-container matColumnDef="update">
            <th mat-header-cell *matHeaderCellDef> UPDATE </th>
            <td mat-cell *matCellDef="let bet"> 
              <button (click)="openDialog(bet)" mat-flat-button color="primary">UPDATE</button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr  mat-row *matRowDef="let bet; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator [length]="100" [pageSize]="5" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
      </section>
    </aside>
  `,
  styles: [`
    .filter {
      background-color: white;
      height: 100%;
      padding: 1rem;
      margin-bottom: -2.5em;
      mat-form-field {
        width: 30%;
      }
    }
    table {
      width: 100%;
      margin-top: 2rem;
    }
    /* for tablet */
    @media only screen and (max-width:800px) {
      section {
        .filter {
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
    /* for mobile */
    @media only screen and (max-width:500px) {
      section {
        .filter {
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
  `]
})
export class RegularMemberUpdateComponent implements OnInit, OnDestroy {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public betcodesService: BetcodesService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  subscriptions: Subscription[] = [];
  user: UserInterface;
  betcodes: MatTableDataSource<BetcodesInterface>;

  displayedColumns: string[] = ['bookmaker', 'code', 'odd', 'status', 'outcome', 'createDate', 'update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.getBetcodes();
  }

  private getBetcodes(): void {
    // push into list
    this.subscriptions.push(
      this.betcodesService.betcodes().subscribe((res) => {
        if (res.code === 200) {

          // check empty response
          //this.emptyResponse(res.obj);

          setTimeout(() => this.betcodes.paginator = this.paginator);
          setTimeout(() => this.betcodes.sort = this.sort);

          // sort arrays by date to return recent first
          const sortedResult = res.obj.sort((a: BetcodesInterface, b: BetcodesInterface) => {
            return <any>new Date(b.createDate) - <any>new Date(a.createDate);
          });

          this.betcodesService.betcodesStatus(sortedResult);

          // Assign the data to the data source for the table to render
          this.betcodes = new MatTableDataSource(sortedResult);
        }
      })
    )
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.betcodes.filter = filterValue.trim().toLowerCase();

    if (this.betcodes.paginator) {
      this.betcodes.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  openDialog(bet: BetcodesInterface): void {
    const dialogRef = this.dialog.open(UpdaterDialogComponent, {
      data: bet
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

      // reload table when dialog is close
      this.getBetcodes();
    });
  }

}
