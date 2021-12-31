// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
