import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb: Inject(FormBuilder);

 myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

}
