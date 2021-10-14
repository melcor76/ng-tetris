import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ng-tetris';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {    
    this.auth.isNicknameset()
  }
}
