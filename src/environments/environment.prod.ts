import * as fb from 'firebase/app';

export const environment = {
  production: true,
  firebase : {
    apiKey: "AIzaSyDjerqM_9Q7aDzNQ9yjs8fdDxCFDxtxQZg",
    authDomain: "img-autoluxury.firebaseapp.com",
    projectId: "img-autoluxury",
    storageBucket: "img-autoluxury.appspot.com",
    messagingSenderId: "859668458107",
    appId: "1:859668458107:web:bdbc8ee721dc68d65890de",
    measurementId: "G-KLN75EFS8V"
  }
};
fb.initializeApp(environment.firebase);