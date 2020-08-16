import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCe-IkMnurre7ajhLopNvAN5-Gbo10UTvA",
  authDomain: "project-portal-4ad0a.firebaseapp.com",
  databaseURL: "https://project-portal-4ad0a.firebaseio.com",
  projectId: "project-portal-4ad0a",
  storageBucket: "project-portal-4ad0a.appspot.com",
  messagingSenderId: "887563843906",
  appId: "1:887563843906:web:1bc97075f8d972e30130db",
  measurementId: "G-L4467HR8CD",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
