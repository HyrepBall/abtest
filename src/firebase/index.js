import React from "react";
import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import {
  FirebaseAuthProvider,
  //FirebaseAuthConsumer,
  IfFirebaseAuthed,
  // IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { firebaseConfig } from './config';

export const FbProvider = (props) => {
  return (
    <FirebaseAuthProvider firebase={ firebase } { ...firebaseConfig }>
      <FirestoreProvider firebase={ firebase } { ...firebaseConfig }>

        {/* <button
          data-testid="signin-anon"
          onClick={ () => {
            firebase.auth().signInAnonymously();
          } }
        >
          Анонимный вход (для получения данных с сервера firebase)
        </button>
        <button
          onClick={ () => {
            firebase.auth().signOut();
          } }
        >
          Выход
        </button> */}

        {/* <FirebaseAuthConsumer>
          { ({ isSignedIn, user, providerId }) => {
            return (
              <pre style={ { height: 100, overflow: "auto" } }>
                { JSON.stringify({ isSignedIn }, null, 2) }
              </pre>
            );
          } }
        </FirebaseAuthConsumer> */}

        <IfFirebaseAuthed>
          <FirestoreCollection path="/users" >
            { d => console.log(d) }
            { props.children }
          </FirestoreCollection>

        </IfFirebaseAuthed>
      </FirestoreProvider>
    </FirebaseAuthProvider>

  )
}