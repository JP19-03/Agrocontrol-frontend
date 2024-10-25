import { Component, inject } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.entity";
import {LoginFormComponent} from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [
    LoginFormComponent
  ]
})
export class LoginPageComponent {
  private _authService: AuthService = inject(AuthService);

  SignIn(user: User) {
    const userSignIn = new User({
      email: user.email,
      password: user.password,
    });

    this._authService.LogInUser(userSignIn).subscribe({
      next: (response) => {console.log('Login successful', response);
        // Redirigir a otra vista, si es necesario
      },
      error: (err) => {console.error('Login failed', err);},
    });
  }
}
