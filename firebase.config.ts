import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAyTMPTM4NT_XMdww15jyi9AUcAHy_DzAw",
  authDomain: "talent-bridge-dd896.firebaseapp.com",
  projectId: "talent-bridge-dd896",
  storageBucket: "talent-bridge-dd896.appspot.com",
  messagingSenderId: "167594097298",
  appId: "1:167594097298:web:1e143212f16ea07f01044b"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { app, auth};


