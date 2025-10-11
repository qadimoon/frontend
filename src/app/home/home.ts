import { Component } from '@angular/core';
import { PATHS } from '../common/constants/paths';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Error } from '../common/components/error/error';
import { parseErrorMessage } from '../common/utils/utils';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    DecimalPipe,
    Error,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly paths = PATHS

  protected readonly parseErrorMessage = (error: any) => parseErrorMessage(error)

  protected readonly fetching: HttpResourceRef<any> = httpResource(() => ({
    url: `${environment.apiUrl}/total`,
    method: 'GET',
    withCredentials: true,
  }))
}
