import { HttpResourceRef, HttpResourceRequest, httpResource } from '@angular/common/http';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../common/interfaces/paginated-response';
import { Pagination } from '../common/interfaces/pagination';
import { parseErrorMessage } from '../common/utils/utils';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Error } from '../common/components/error/error';
import { Pillar } from './pillar';
import { PillarCreation } from './pillar-creation/pillar-creation';
import { Select } from 'primeng/select';
import { Fluid } from 'primeng/fluid';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Message } from 'primeng/message';
import { Control } from '../common/utils/control';
import { Subdistrict } from '../common/interfaces/subdistrict';
import { District } from '../common/interfaces/district';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pillars',
  imports: [
    Error,
    Button,
    TableModule,
    DatePipe,
    Select,
    Fluid,
    InputIcon,
    InputText,
    IconField,
    ReactiveFormsModule,
    ConfirmDialog,
    Message,
  ],
  providers: [
    DialogService,
    ConfirmationService,
  ],
  templateUrl: './pillars.html',
  styleUrl: './pillars.css'
})
export class Pillars {
  constructor() {
    effect(() => {
      if (this.deleting.hasValue()) {
        this.isPillarDeletionDialogVisile = false
        this.fetching.reload()
      }
    })
  }

  private readonly dialogService = inject(DialogService)

  protected readonly control = new Control('', '')

  protected readonly sorter = signal<{ order: number, sort: string }>({ order: -1, sort: 'date' })
  protected readonly first = signal(0)
  protected readonly query = signal<string | undefined>(undefined)
  protected readonly districtId = signal<number | undefined>(undefined)
  protected readonly subdistrictId = signal<number | undefined>(undefined)

  protected readonly fetching: HttpResourceRef<PaginatedResponse<Pillar> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/pillars`,
    method: 'GET',
    withCredentials: true,
    params: {
      page: this.pagination.page(),
      limit: this.pagination.limit(),
      order: this.sorter().order === 1 ? 'ASC' : 'DESC',
      sort: this.sorter().sort,
      ...(this.query() && { query: this.query() }),
      ...(this.districtId() && { districtId: this.districtId() }),
      ...(this.subdistrictId() && { subdistrictId: this.subdistrictId() }),
    }
  }))

  protected readonly districtsFetching: HttpResourceRef<PaginatedResponse<District> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/districts`,
    method: 'GET',
    withCredentials: true,
    params: {
      page: 0,
      limit: 10,
    }
  }))

  protected readonly subdistrictsFetching: HttpResourceRef<PaginatedResponse<Subdistrict> | undefined> = httpResource(() => this.districtId() ? ({
    url: `${environment.apiUrl}/districts/${this.districtId()}/subdistricts`,
    method: 'GET',
    withCredentials: true,
    params: {
      page: 0,
      limit: 10,
    }
  }) : undefined)

  protected readonly parseErrorMessage = (error: any) => parseErrorMessage(error)
  protected dialog: DynamicDialogRef | undefined
  protected isPillarDeletionDialogVisile = false
  protected readonly pagination: Pagination<Pillar> = {
    items: signal([]),
    page: signal(0),
    limit: signal(10),
    total: signal(0)
  }

  protected timer: any
  protected onSearch() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.query.set(this.control.value)
    }, 1000)
  }

  protected loadDataLazy(event: TableLazyLoadEvent) {
    if (event.sortOrder !== this.sorter().order) {
      this.sorter.update(value => ({
        ...value,
        order: event.sortOrder as number
      }))
    }

    if (event.sortField !== this.sorter().sort) {
      this.sorter.update(value => ({
        ...value,
        sort: event.sortField as string
      }))
    }

    if (event.rows && event.rows !== this.pagination.limit()) {
      this.pagination.limit.set(event.rows)
    }

    if (event.first !== undefined && event.rows) {
      this.first.set(event.first)
      this.pagination.page.set(event.first / event.rows)
    }
  }

  protected readonly request: WritableSignal<HttpResourceRequest | undefined> = signal(undefined)
  protected readonly deleting: HttpResourceRef<any | undefined> = httpResource(() => this.request())

  protected supervisorId?: number
  protected delete() {
    this.request.set(({
      url: `${environment.apiUrl}/supervisors/${this.supervisorId}`,
      method: 'DELETE',
      withCredentials: true,
    }))
  }

  protected showPillarCreationDialog() {
    this.dialog = this.dialogService.open(PillarCreation, {
      header: 'إضافة ركيزة',
      modal: true,
      closable: true,
      focusOnShow: false,
    })

    this.dialog.onClose.subscribe(value => {
      if (value && value === true) {
        this.fetching.reload()
      }
    })
  }
}
