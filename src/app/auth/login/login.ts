import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PATHS } from '../../common/constants/paths';
import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Control } from '../../common/utils/control';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { parseErrorMessage } from '../../common/utils/utils';
import { SimpleResponse } from '../../common/interfaces/simple-response';
import { Admin } from '../admin';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [
    FloatLabel,
    InputText,
    Password,
    Button,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor() {
    effect(() => {
      if (this.loggingIn.hasValue()) {
        this.authService.authenticate(this.loggingIn.value().data.id)
        this.router.navigateByUrl(this.paths.INDEX())
      }
    })
  }

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  protected readonly paths = PATHS

  protected readonly parseErrorMessage = (error: any) => parseErrorMessage(error)
  
  private readonly url: WritableSignal<HttpResourceRequest | undefined> = signal(undefined)
  protected readonly loggingIn: HttpResourceRef<SimpleResponse<Admin> | undefined> = httpResource(() => this.url())

  protected readonly loginForm = new FormGroup({
    username: new Control('اسم المستخدم', '', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(32),
      ]
    }),
    password: new Control('كلمة المرور', '', { 
      nonNullable: true,
      isFeminine: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128)
      ]
    }),
  })

  login() {
    this.url.set({
      url: `${environment.apiUrl}/auth/login`,
      method: 'POST',
      withCredentials: true,
      body: {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      }
    })
  }
}
