import { JsonPipe } from '@angular/common'
import { Component, signal } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-reactive-forms-practice',
    // ReactiveFormsModule provides [formGroup], formControlName, etc.
    // JsonPipe powers the {{ ... | json }} debug output.
    imports: [ReactiveFormsModule, JsonPipe],
    template: `
      <div class='reactive-forms-practice'>
        <h1>Reactive Forms Practice</h1>

        <!-- [formGroup] connects this <form> to the FormGroup in the class.
             (ngSubmit) fires on submit; we guard on validity ourselves. -->
        <form [formGroup]='form' (ngSubmit)='onSubmit()'>

          <label>
            Name
            <!-- formControlName links this input to form.controls.name.
                 Angular syncs the value both ways for us. -->
            <input formControlName='name' />
          </label>
          <!-- Show errors only AFTER the user has interacted (touched),
               so we don't yell at an empty pristine form. -->
          @if (name.touched && name.invalid) {
            <small>
              @if (name.hasError('required')) { Name is required. }
              @if (name.hasError('minlength')) { At least 2 characters. }
            </small>
          }

          <label>
            Email
            <input formControlName='email' type='email' />
          </label>
          @if (email.touched && email.invalid) {
            <small>
              @if (email.hasError('required')) { Email is required. }
              @if (email.hasError('email')) { Not a valid email. }
            </small>
          }

          <label>
            Age
            <input formControlName='age' type='number' />
          </label>
          @if (age.touched && age.invalid) {
            <small>
              @if (age.hasError('required')) { Age is required. }
              @if (age.hasError('min')) { Must be 18 or older. }
            </small>
          }

          <!-- Disable submit while the form is invalid. form.invalid is a
               live-computed rollup of every control's validity. -->
          <button type='submit' [disabled]='form.invalid'>Submit</button>
        </form>

        <hr />

        <!-- Live inspection of the form's reactive state. -->
        <p>Form status: {{ form.status }}</p>
        <p>Form value: {{ form.value | json }}</p>

        @if (submitted()) {
          <p>Submitted ✅ {{ submitted() | json }}</p>
        }
      </div>
    `,
})
export class ReactiveFormsPractice {
    // A FormGroup is a keyed bundle of FormControls. Each FormControl holds
    // a value + its validators + validity/touched/dirty state.
    protected readonly form = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(2)],
        }),
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
        age: new FormControl<number | null>(null, {
            validators: [Validators.required, Validators.min(18)],
        }),
    })

    // Getters so the template can reference controls tersely (name.touched...).
    protected get name() { return this.form.controls.name }
    protected get email() { return this.form.controls.email }
    protected get age() { return this.form.controls.age }

    protected readonly submitted = signal<unknown>(null)

    protected onSubmit(): void {
        // Belt-and-suspenders: even though the button is disabled, guard here.
        if (this.form.invalid) {
            // Mark everything touched so all error messages appear at once.
            this.form.markAllAsTouched()
            return
        }
        this.submitted.set(this.form.getRawValue())
    }
}
