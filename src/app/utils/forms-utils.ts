import { FormGroup } from '@angular/forms';

export class FormsUtils {
  static isValidField(form: FormGroup, fieldName: string): Boolean | null {
    return (
      (!!form.controls[fieldName].errors && form.controls[fieldName].touched) ||
      form.controls[fieldName].dirty
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor minimo es ${errors['min'].min}`;
      }
    }
    return null;
  }
}
