import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  jogo
  sala
  host
  constructor(private firestore: AngularFirestore) { }

  getsala() {
    return this.sala
  }

  setsala(sala) {
    this.sala = sala
  }

  getHost() {
    return this.host
  }

  setHost(host) {
    this.host = host
  }

  getJogo() {
    return this.jogo
  }

  setJogo(jogo) {
    this.jogo = jogo
  }


  firestoresetdata(colection: string, doc: string, data: any) {
    return this.firestore.collection(colection).doc(doc).set(data);
  }

  firestoreupdatedata(colection: string, doc: string, data: any) {
    return this.firestore.collection(colection).doc(doc).update(data);
  }

  firestoregetdata(colection: string, doc: string) {
    return this.firestore.collection(colection).doc(doc).snapshotChanges()
  }

  firestoregetcolec(colection: string) {
    return this.firestore.collection(colection).snapshotChanges()
  }

}
