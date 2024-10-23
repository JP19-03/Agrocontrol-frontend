import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm,
  FormGroupDirective,
  AbstractControl, AbstractControlOptions
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../models/user.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

/** ErrorStateMatcher para manejar validaciones en campos sucios, tocados o enviados */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() userCreated = new EventEmitter<User>();  // Output al componente padre

  // Manejamos visibilidad de contraseña usando signal
  hide = signal(true);

  // Manejamos dinámicamente los roles seleccionados
  role: string | null = null;

  matcher = new MyErrorStateMatcher();  // Instancia del ErrorStateMatcher
  private fb: FormBuilder = new FormBuilder();

  // Definición del FormGroup con validadores
  public registerForm: FormGroup = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, this.phoneValidator]],
      roles: ['', Validators.required],
      dni: ['', [Validators.required, this.dniValidator]],
      companyName: ['', [Validators.required]],
      ruc: ['', [Validators.required, this.rucValidator]],
    },
    {
      validators: this.passwordMatchValidator('password', 'confirmPassword')
    } as AbstractControlOptions  // Indicamos explícitamente el tipo
  );

  constructor() {}

  // onPasswordInput() {
  //   this.registerForm.get('confirmPassword')?.markAsTouched(); // Asegura que el campo esté marcado como tocado
  //   this.registerForm.updateValueAndValidity(); // Revalida el formulario completo
  //   console.log(this.registerForm.errors); // Verifica si el error persiste
  // }
  // Validador personalizado para asegurar que las contraseñas coincidan
  private passwordMatchValidator(password: string, confirmPassword: string) {
    return (form: AbstractControl) => {
      const pass = form.get(password)?.value;
      const confirmPass = form.get(confirmPassword)?.value;

      const error = pass !== confirmPass ? { notMatching: true } : null;

      // También aplica el error al control individual
      form.get(confirmPassword)?.setErrors(error);

      return error;
    };
  }

  // Validador para asegurarse de que el DNI tenga exactamente 8 números
  private dniValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{8}$/.test(value); // Verifica que tenga exactamente 8 dígitos
    return valid ? null : { invalidDni: true };
  }

// Validador para asegurarse de que el RUC tenga exactamente 11 números
  private rucValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{11}$/.test(value); // Verifica que tenga exactamente 11 dígitos
    return valid ? null : { invalidRuc: true };
  }

// Validador para asegurarse de que el teléfono tenga exactamente 9 números
  private phoneValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{9}$/.test(value); // Verifica que tenga exactamente 9 dígitos
    return valid ? null : { invalidPhone: true };
  }

  // Método para alternar la visibilidad de la contraseña
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();  // Evita que el evento se propague
  }

  // Manejo de cambios en los roles y actualización dinámica del formulario
  onRoleChange(event: any) {
    this.role = event.value;
    this.registerForm.get('roles')?.setValue(this.role); // Actualizamos el valor del rol

    if (this.role === 'producer') {
      // Aplicamos Validators.required junto con la validación personalizada del DNI
      this.registerForm.get('dni')?.setValidators([
        Validators.required,
        this.dniValidator.bind(this) // Aseguramos que 'this' se refiera al componente
      ]);

      // Quitamos validaciones de companyName y ruc
      this.registerForm.get('companyName')?.clearValidators();
      this.registerForm.get('ruc')?.clearValidators();
    } else if (this.role === 'distributor') {
      // Aplicamos Validators.required junto con la validación personalizada del RUC
      this.registerForm.get('companyName')?.setValidators([
        Validators.required
      ]);

      this.registerForm.get('ruc')?.setValidators([
        Validators.required,
        this.rucValidator.bind(this)
      ]);

      // Quitamos validaciones del DNI
      this.registerForm.get('dni')?.clearValidators();
    }

    // Asegúrate de actualizar la validez de los campos y marcarlos como tocados
    this.registerForm.get('dni')?.updateValueAndValidity();
    this.registerForm.get('companyName')?.updateValueAndValidity();
    this.registerForm.get('ruc')?.updateValueAndValidity();
  }

  // Método para enviar los datos al componente padre
  submitForm() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.userCreated.emit(user);  // Emitimos el usuario al componente padre
    } else {
      console.log('Form is invalid');
    }
  }
}
