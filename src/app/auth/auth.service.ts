import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {
        this.checkAuthentication()
    }

    private readonly authKey = 'aaid'
    private readonly encryptionKey = 'nasonas'

    private readonly aaid$ = signal<number | undefined>(undefined)
    readonly aaid = computed(this.aaid$)

    authenticate(auid: number) {
        localStorage.setItem(this.authKey, auid.toString())
        this.aaid$.set(auid)
    }

    deauthenticate() {
        localStorage.removeItem(this.authKey)
        this.aaid$.set(undefined)
    }

    private checkAuthentication() {
        const aaid = localStorage.getItem(this.authKey)
        aaid ? this.aaid$.set(parseInt(aaid)) : this.aaid$.set(undefined)
    }
}