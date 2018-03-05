
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public authState: any = null;
  public userOn = false;

  constructor(
    private afAuth: AngularFireAuth,
    ) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.userOn =   !!auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin(){
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.authState = credential.user;
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user;
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.userOn = true;
        //this.updateUserData()

      })
      .catch(error => console.log(error));
  }

  emailLogin(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        //this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////


  //// Helpers ////

}
