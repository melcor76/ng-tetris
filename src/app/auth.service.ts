import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //_nickname = "Pedro"
  _nickname = null
  constructor(private router: Router) { }

  getNickname() {
    return this._nickname
  }

  setNickname(nickname: string) {
    this._nickname = nickname
    this.router.navigate(['/'])
  }

  isNicknameset() {
    if (this._nickname == null) {
      console.log("inicio");
      this.router.navigate(['/inicio'])
      return false
    } else {
      this.router.navigate(['/'])

      return true
    }
  }
}
