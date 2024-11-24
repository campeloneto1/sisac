import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../sistema/storage.service';
import { catchError, throwError } from 'rxjs';
import { SessionService } from '../sistema/session.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const setorageService = inject(StorageService);
  
  const authToken = setorageService.getItem('token');
  const subunidade = setorageService.getItem('subunidade');
  let authReq;
  // Clone the request and add the authorization header
  if (req.method === "GET") {
    // Ensure we are using the proper HttpParams format
    const params = req.params.set('subunidade', subunidade);
    authReq = req.clone({
      params: params,  // Update the params using HttpParams
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  } else {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
 

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          //console.error('Unauthorized request:', err);
          router.navigate(['auth']);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          //console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        //console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );
};
