import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../../interfaz/auth/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http = inject(HttpClient);
  private readonly baseHost = environment.urlBackend+'auth/';

  login(loginRequest: LoginRequest): Observable<any> {    
    return this._http.post(this.baseHost+'login', loginRequest);
  }


}
