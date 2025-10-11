import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService)
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (req.withCredentials && error.status === HttpStatusCode.Unauthorized && authService.aaid()) authService.deauthenticate()
            throw error
        })
    )
}