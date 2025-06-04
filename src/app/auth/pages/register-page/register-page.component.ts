import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { FormUtils } from '../../../utils/forms-utils';

// Validador personalizado para comparar passwords

// export const passwordMatchValidator: ValidatorFn = (
//   group: AbstractControl
// ): ValidationErrors | null => {
//   const password = group.get('password')?.value;
//   const password2 = group.get('password2')?.value;
//   return password === password2 ? null : { passwordMismatch: true };
// };

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.noStrider,
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServerResponse],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      password2: ['', Validators.required],
    },
    {
      validators: [
        this.formUtils.isFieldOneEqualFieldtwo('password', 'password2'),
      ],
    }
  );

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
