import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private auth: AuthService, private firebase: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.auth.getNickname());

  }

  criarsala() {

    let data = {
      qtd_max_players: 2,
      host: this.auth.getNickname(),
      gamestart: 0,
      jogadores: [this.auth.getNickname()]
    }

    let board = {
      board: "[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]",
      level: 0,
      lines: 0,
      points: 0,
      name: this.auth.getNickname()
    }
    this.firebase.firestoresetdata(this.auth.getNickname(), '0', data).then(() => {
      this.firebase.firestoresetdata(this.auth.getNickname(), 'host', board).then(() => {
        this.router.navigate(['sala/' + this.auth.getNickname()])
      })
    }
    ).catch(error => {
      console.log(error);

    })
    //this.firebase.firestoreupdatedata("Sala1",'teste',{daat: 'g'})
  }

  entrarsala() {
    this.router.navigate(['sala/' + (<HTMLSelectElement>document.getElementById("entrarsala")).value])

  }
}
