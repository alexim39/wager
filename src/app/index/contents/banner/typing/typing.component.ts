import { AfterViewInit, Component, Input, ViewChild, OnInit, ElementRef } from "@angular/core";
// declare jquery as any
declare const $: any;


@Component({
  selector: 'async-typing',
  template: `
    <header fxLayout="column" fxLayoutAlign="center center">
        <div><!-- With us:  --><span #textElement></span> <span #blinkElement class="blink"></span></div>
    </header>
  `,
  styles: [`
    header {
      div {
        font-family: "Courier";
        font-size: 1em;
        font-weight: bold;
      }
    }

    .blink {
      border-right-style: solid;
      opacity: 0;
      animation: blinking 1s linear infinite;
    }

    @keyframes blinking {
      from,
      49.9% {
        opacity: 0;
      }
      50%,
      to {
        opacity: 1;
      }
    }

    /* For tablets: */
    @media only screen and (max-width:800px) { }

    /* For mobile phones: */
    @media only screen and (max-width:500px) { }
  `]
})
export class TypingComponent implements OnInit, AfterViewInit {

  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;
  @Input() wordArray: string[] = [
    " You get free bet analytics tools to analyse your bets.    ",
    " You get free bet codes analysed with our system.     ",
    " You get options to invest the bet and grow your money everyday.     ",
    //" Get help with accademic work from fellow students.     ",
    //" Get links to helpful  academic resources.     ",
    //" Get links to income generating resources.     ",
    //" Give help with accademic work to fellow students.     ",
  ];

  private i = 0;

  constructor() { }

  ngOnInit(): void {
    console.log()
  }

 

  ngAfterViewInit(): void {
    this.typingEffect();
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, 300);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }
        this.typingEffect();
        return;
      }
      setTimeout(loopDeleting, 100);
    };
    loopDeleting();
  }





}
