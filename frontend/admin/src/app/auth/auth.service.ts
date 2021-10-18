import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenPayload, TokenResponse, User } from './auth.interfaces';
import { tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private getExp(token: string): TokenPayload {
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = Buffer.from(payload, 'base64').toString();
      let user = JSON.parse(payload);
      user.exp = user.exp * 1000;
      return user;
    }
    return {
      username: '',
      email: '',
      fullname: '',
      role: [''],
      _id: '',
      sub: '',
      iat: 0,
      exp: 0,
    };
  }

  private setToken(authResult: TokenResponse) {
    if (authResult.access_token) {
      localStorage.setItem('id_token', authResult.access_token);
      this.getExpiration();
    }
  }

  private getToken(): string {
    const token = localStorage.getItem('id_token');
    return token ? token : '';
  }

  public isLoggedIn() {
    return new Date().getTime() < this.getExpiration();
  }

  private getExpiration(): any {
    return this.getExp(this.getToken()).exp;
  }

  login(credentials: User) {
    return this.http.post<TokenResponse>('/api/signin', credentials).pipe(
      tap((res) => this.setToken(res)),
      shareReplay()
    );
  }

  public logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/bejelentkezes');
  }

  public getUser() {
    return this.getExp(this.getToken());
  }

  public modUser(userData: TokenPayload) {
    console.log(userData)
  }
}
