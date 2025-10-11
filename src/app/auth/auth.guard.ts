import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { PATHS } from "../common/constants/paths";

export namespace AuthGuard {
    export const canLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if (!inject(AuthService).aaid()) return true
        else return inject(Router).parseUrl(PATHS.HOME(false))
    }

    export const canAct: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if (!inject(AuthService).aaid()) return inject(Router).parseUrl(PATHS.LOGIN(false))
        else return true
    }
}