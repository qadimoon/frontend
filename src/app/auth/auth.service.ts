import { computed, Injectable, signal } from "@angular/core";
// import CryptoJS from 'crypto-js';

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
        // localStorage.setItem(this.authKey, CryptoJS.AES.encrypt(JSON.stringify(auid), this.encryptionKey).toString())
        localStorage.setItem(this.authKey, auid.toString())
        this.aaid$.set(auid)
    }

    deauthenticate() {
        localStorage.removeItem(this.authKey)
        this.aaid$.set(undefined)
    }

    private checkAuthentication() {
        // const user = localStorage.getItem(this.authKey)
        // if (user) this.aaid$.set(Number(JSON.parse(CryptoJS.AES.decrypt(user, this.encryptionKey).toString(CryptoJS.enc.Utf8))))
        // else this.aaid$.set(undefined)

        const aaid = localStorage.getItem(this.authKey)
        aaid ? this.aaid$.set(parseInt(aaid)) : this.aaid$.set(undefined)
    }
}