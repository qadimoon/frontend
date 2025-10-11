import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { HeaderState } from './header-state';
import { PATHS } from '../../constants/paths';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { HttpRequest, httpResource, HttpResourceRef, HttpResourceRequest, HttpResponse } from '@angular/common/http';
import { SimpleResponse } from '../../interfaces/simple-response';
import { Admin } from '../../../auth/admin';
import { environment } from '../../../../environments/environment';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Response } from '../../interfaces/response';
import { Message } from 'primeng/message';
import { parseErrorMessage } from '../../utils/utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    Popover,
    Button,
    Dialog,
    Message,
    ConfirmDialog,
    DatePipe,
  ],
  providers: [
    ConfirmationService,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor() {
    effect(() => {
      if (this.adminFetching.statusCode() === 401) this.authService.deauthenticate()
      if (this.loggingOut.status() === 'resolved') {
        this.authService.deauthenticate()
        this.state.isLogoutDialogVisile = false
        window.location.reload()
      }
    })
  }

  protected readonly state: HeaderState = {
    navItems: [
      { title: 'الرئيسية', path: PATHS.HOME(false) },
      { title: 'المشرفون', path: PATHS.SUPERVISORS(false) },
      { title: 'الأعضاء', path: PATHS.MEMBERS(false) },
      { title: 'الركائز', path: PATHS.PILLARS(false) },
    ],
    isSidebarVisible: false,
    isProfileVisible: false,
    isLogoutDialogVisile: false,
  }

  protected readonly authService = inject(AuthService)
  protected readonly paths = PATHS

  protected readonly adminFetching: HttpResourceRef<SimpleResponse<Admin> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/admins/account`,
    method: 'GET',
    withCredentials: true,
  }))

  private readonly loggingOutUrl: WritableSignal<HttpResourceRequest | undefined> = signal(undefined)
  protected readonly loggingOut: HttpResourceRef<Response | undefined> = httpResource(() => this.loggingOutUrl())

  protected readonly parseErrorMessage = (error: any) => parseErrorMessage(error)

  protected logout() {
    this.loggingOutUrl.set(({
      url: `${environment.apiUrl}/auth/logout`,
      method: 'POST',
      withCredentials: true,
    }))
  }
}
