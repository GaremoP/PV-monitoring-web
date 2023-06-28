import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEmail: string | null = null;

  constructor(private auth: Auth) {
    this.subscribeToAuthState();
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  private subscribeToAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      this.userEmail = user ? user.email : null;
    });
  }
}
