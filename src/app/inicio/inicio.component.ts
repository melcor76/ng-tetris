import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  setnickname() {
    this.auth.setNickname((<HTMLSelectElement>document.getElementById("nickname")).value)
  }

}
