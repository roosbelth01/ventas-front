import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/services/app.layout.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule, RouterLink, CommonModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false;
  loginForm!: FormGroup;

  private layoutService = inject(LayoutService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20) ]],
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
