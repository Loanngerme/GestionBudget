import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';




@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  errorMessage = '';

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  showRegisterConnect(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      return;
    }

    const { username, password } = this.registerForm.value;
    const success = this.authService.register(username!, password!);

    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.showRegisterConnect('Le nom d\'utilisateur est déjà utilisé');
    }
  }
  
}