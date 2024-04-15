import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])), 
    provideAnimations(), 
    provideToastr({timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // Toastr providers
    provideEnvironmentNgxMask(),
  ]
};
