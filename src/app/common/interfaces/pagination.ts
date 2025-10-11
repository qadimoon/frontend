import { WritableSignal } from "@angular/core"

export interface Pagination<T> {
    items: WritableSignal<T[]>,
    page: WritableSignal<number>,
    limit: WritableSignal<number>,
    total: WritableSignal<number>,
}