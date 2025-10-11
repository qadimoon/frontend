import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Control } from '../../common/utils/control';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { parseErrorMessage } from '../../common/utils/utils';
import { environment } from '../../../environments/environment';
import { SimpleResponse } from '../../common/interfaces/simple-response';
import { Supervisor } from '../supervisor';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMask } from 'primeng/inputmask';
import { District } from '../../common/interfaces/district';
import { PaginatedResponse } from '../../common/interfaces/paginated-response';
import { Pagination } from '../../common/interfaces/pagination';
import { Subdistrict } from '../../common/interfaces/subdistrict';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-supervisor-creation',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputMask,
    Button,
    Select,
  ],
  templateUrl: './supervisor-creation.html',
  styleUrl: './supervisor-creation.css'
})
export class SupervisorCreation {
  constructor() {
    effect(() => {
      if (this.districtsFetching.hasValue()) {
        this.districtsPagination.items.set(this.districtsFetching.value().data.items)
      }

      if (this.subdistrictsFetching.hasValue()) {
        this.subdistrictsPagination.items.set(this.subdistrictsFetching.value().data.items)
      }

      if (this.creation.hasValue()) {
        this.dialogRef.close(true)
      }
    })
  }

  private readonly dialogRef = inject(DynamicDialogRef)
  private readonly url: WritableSignal<HttpResourceRequest | undefined> = signal(undefined)
  protected readonly creation: HttpResourceRef<SimpleResponse<Supervisor> | undefined> = httpResource(() => this.url())
  protected readonly parseErrorMessage = (error: any) => parseErrorMessage(error)
  protected isPhoneNumberCompleted = false

  protected readonly districtsPagination: Pagination<District> = {
    items: signal([]),
    page: signal(0),
    limit: signal(10),
    total: signal(0)
  }

  protected readonly subdistrictsPagination: Pagination<Subdistrict> = {
    items: signal([]),
    page: signal(0),
    limit: signal(10),
    total: signal(0)
  }

  protected readonly form = new FormGroup({
    name: new Control('الاسم', '', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(32),
      ]
    }),
    phoneNumber: new Control('رقم الهاتف', '', { 
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    district: new Control<number | undefined>('القضاء', undefined, {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    subdistrict: new Control<number | undefined>('الناحية', undefined, {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
  })

  private readonly districtsFetching: HttpResourceRef<PaginatedResponse<District> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/districts`,
    method: 'GET',
    withCredentials: true,
    params: {
      page: this.districtsPagination.page(),
      limit: this.districtsPagination.limit(),
    }
  }))

  protected readonly subdistrictsRequest: WritableSignal<HttpResourceRequest | undefined> = signal(undefined)
  protected readonly subdistrictsFetching: HttpResourceRef<PaginatedResponse<Subdistrict> | undefined> = httpResource(() => this.subdistrictsRequest())

  protected fetchSubdistricts() {
    this.subdistrictsRequest.set({
      url: `${environment.apiUrl}/districts/${this.form.controls.district.value ?? 0}/subdistricts`,
      method: 'GET',
      withCredentials: true,
      params: {
        page: this.subdistrictsPagination.page(),
        limit: this.subdistrictsPagination.limit(),
      }
    })
  }

  protected create() {
    this.url.set(({
      url: `${environment.apiUrl}/supervisors`,
      method: 'POST',
      body: {
        name: this.form.controls.name.value,
        phoneNumber: this.form.controls.phoneNumber.value,
        subdistrictId: this.form.controls.subdistrict.value,
      },
      withCredentials: true,
    }))
  }
}
