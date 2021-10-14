import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { JogoComponent } from './jogo/jogo.component';
import { PrincipalComponent } from './principal/principal.component';
import { SalaesperaComponent } from './salaespera/salaespera.component';


const routes: Routes = [
  { path: "", component: PrincipalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'sala/:parametro', component: SalaesperaComponent },
  { path: 'jogo', component: JogoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
