import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResponseInterceptors: HttpInterceptorFn = (req, next) => next(req).pipe(catchError(handleErrorResponse));


function handleErrorResponse(error: HttpErrorResponse) {
    const errorResponse = `Error Status ${error.status}, message: ${error.message}`;

    if (error.status === 401) {
        return throwError(() =>'Credenciales incorrectas. Por favor, intenta de nuevo.');
      } else {
        return throwError(() => errorResponse);
      }

    //return throwError(() => errorResponse);
}