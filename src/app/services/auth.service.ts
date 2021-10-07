import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { tap, switchMap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient, private tokenSvc: TokenService) {}

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap((_) => this.profile()));
  }

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.url}/login`, { email, password })
      .pipe(tap((token) => (this.tokenSvc.token = token.access_token)));
  }

  profile() {
    // const headers = new HttpHeaders()
    // headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(
      `${this.url}/profile`
      // ,{headers}
    );
  }
}
