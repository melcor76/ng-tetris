import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-salaespera',
  templateUrl: './salaespera.component.html',
  styleUrls: ['./salaespera.component.css']
})
export class SalaesperaComponent implements OnInit {

  sala
  carregado = false
  dadosjogo
  parametro
  host = null
  constructor(private auth: AuthService, private firebase: FirebaseService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.parametro = this.activatedRoute.snapshot.paramMap.get('parametro');
    if (this.parametro == null || this.parametro == undefined || this.parametro == '') {
      this.router.navigate(['/'])
      return
    }
    
    this.firebase.setsala(String(this.parametro))
    this.firebase.setJogo(this.parametro)
    this.firebase.firestoregetcolec(String(this.parametro)).subscribe(doc => {
      this.sala = doc
      this.carregado = true
      this.dadosjogo = doc[0].payload.doc.data()
      this.firebase.setHost(this.dadosjogo.host)

      if (this.dadosjogo.host == this.auth.getNickname()) {
        this.host = true
      } else {
        this.host = false
        if (this.dadosjogo.jogadores.length < 2) {
          this.dadosjogo.jogadores.push(this.auth.getNickname())

          let board = {
            board: "[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]",
            level: 0,
            lines: 0,
            points: 0,
            name: this.auth.getNickname()
          }

          this.firebase.firestoresetdata(String(this.parametro), 'guest', board).then(() => {
            this.firebase.firestoreupdatedata(String(this.parametro), '0', { desafiante: this.auth.getNickname(), jogadores: this.dadosjogo.jogadores, gamestart: 1 })
          })
        }
      }

      if (this.host) {
      }

      /*
       for (let index = 0; index < this.dadosjogo.jogadores.length; index++) {
         if (this.dadosjogo.jogadores[index] == this.auth.getNickname()) {
           colocar = false
         }
       }
       */

      if (this.dadosjogo.jogadores) {

      }

    })
  }

}
