import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormResetterService {
  // you can put this method in a module and reuse it as needed
  reset(form: FormGroup) {
    form.reset();

    Object.keys(form.controls).forEach(key => {
      //form.get(key).setErrors(null);
      form.get(key).setErrors(undefined);
    });
  }
}