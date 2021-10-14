import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";


import { AppComponent } from './app.component';
import { BoardComponent } from './board.component';
import { Board2Component } from './board2/board2.component';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { SalaesperaComponent } from './salaespera/salaespera.component';
import { JogoComponent } from './jogo/jogo.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, Board2Component, InicioComponent, PrincipalComponent, SalaesperaComponent, JogoComponent],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
