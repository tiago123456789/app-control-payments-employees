import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerServiceWorker } from "./serviceWorker"

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyATalkTUyY2pBWXpKoKTYCLMd3MizFs7rI",
//   authDomain: "app-control-payments-employee.firebaseapp.com",
//   projectId: "app-control-payments-employee",
//   storageBucket: "app-control-payments-employee.appspot.com",
//   messagingSenderId: "852124156432",
//   appId: "1:852124156432:web:9a72b40b25cb428f8a4095"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// registerServiceWorker();
reportWebVitals();
