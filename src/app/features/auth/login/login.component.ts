import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/services/app.layout.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/interfaz/auth/login-request';
import { Token } from '../../../core/interfaz/auth/token';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, RouterLink, CommonModule, InputTextModule, ButtonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false;
  loginForm!: FormGroup;

  loginData!: LoginRequest;
  errorMessage: string | null = null;

  private layoutService = inject(LayoutService);
  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private messageService = inject(MessageService);

  //token$ = this.authService.login();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
    });

    
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  login11(){

    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe((resp: any) => {
      console.log('respuestas', resp);
    });
  }


  login() {
    this.loginData = this.loginForm.value;
    this.authService.login(this.loginData).subscribe({
      next: (resp: Token) => {
        console.log('respuestas', resp);
        this.errorMessage = null;
        // Redirigir a una ruta segura si el login es exitoso
      },
      error: (error) => {
        this.errorMessage = error; // Asigna el mensaje de error para mostrarlo en la vista
        console.log('ENVIAR ALERTA:::::::::::::');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      }
    });
  }
}
