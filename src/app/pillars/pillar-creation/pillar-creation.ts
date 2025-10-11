import { HttpResourceRequest, HttpResourceRef, httpResource } from '@angular/common/http';
import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../../environments/environment';
import { SimpleResponse } from '../../common/interfaces/simple-response';
import { Control } from '../../common/utils/control';
import { parseErrorMessage } from '../../common/utils/utils';
import { Supervisor } from '../../supervisors/supervisor';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { District } from '../../common/interfaces/district';
import { Pagination } from '../../common/interfaces/pagination';
import { PaginatedResponse } from '../../common/interfaces/paginated-response';
import { Subdistrict } from '../../common/interfaces/subdistrict';
import { Member } from '../../members/member';
import { InputNumber } from 'primeng/inputnumber';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-pillar-creation',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputMask,
    InputNumber,
    Button,
    Select,
    RadioButton,
  ],
  templateUrl: './pillar-creation.html',
  styleUrl: './pillar-creation.css'
})
export class PillarCreation {
  constructor() {
    effect(() => {
      if (this.districtsFetching.hasValue()) {
        this.districtsPagination.items.set(this.districtsFetching.value().data.items)
      }

      if (this.subdistrictsFetching.hasValue()) {
        this.subdistrictsPagination.items.set(this.subdistrictsFetching.value().data.items)
      }

      if (this.supervisorsFetching.hasValue()) {
        this.supervisorsPagination.items.set(this.supervisorsFetching.value().data.items)
      }

      if (this.membersFetching.hasValue()) {
        this.membersPagination.items.set(this.membersFetching.value().data.items)
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

  protected readonly supervisorsPagination: Pagination<Supervisor> = {
    items: signal([]),
    page: signal(0),
    limit: signal(10),
    total: signal(0)
  }

  protected readonly membersPagination: Pagination<Member> = {
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
    voterNumber: new Control('رقم الناخب', '', { 
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]
    }),
    votersCount: new Control<number | undefined>('عدد الناخبين', undefined, { 
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
    supervisor: new Control<number | undefined>('المشرف', undefined),
    member: new Control<number | undefined>('العضو', undefined),
    creator: new Control<'Supervisor' | 'Member'>('', 'Supervisor')
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

  private readonly supervisorsFetching: HttpResourceRef<PaginatedResponse<Supervisor> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/supervisors?page=${this.districtsPagination.page()}&limit=${this.districtsPagination.limit()}`,
    method: 'GET',
    withCredentials: true,
  }))

  private readonly membersFetching: HttpResourceRef<PaginatedResponse<Member> | undefined> = httpResource(() => ({
    url: `${environment.apiUrl}/members?page=${this.districtsPagination.page()}&limit=${this.districtsPagination.limit()}`,
    method: 'GET',
    withCredentials: true,
  }))

  protected create() {
    this.url.set(({
      url: `${environment.apiUrl}/pillars`,
      method: 'POST',
      body: {
        name: this.form.controls.name.value,
        phoneNumber: this.form.controls.phoneNumber.value,
        voterNumber: this.form.controls.voterNumber.value,
        votersCount: this.form.controls.votersCount.value,
        subdistrictId: this.form.controls.subdistrict.value,
        ...(this.form.controls.supervisor.value !== null && { supervisorId: this.form.controls.supervisor.value }),
        ...(this.form.controls.member.value !== null && { memberId: this.form.controls.member.value })
      },
      withCredentials: true,
    }))
  }
}
