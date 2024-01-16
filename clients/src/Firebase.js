
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwm1xsJSNMGO-kh15hDfD0S4zWxpMqRzk",
  authDomain: "imageuploaddb-3c249.firebaseapp.com",
  projectId: "imageuploaddb-3c249",
  storageBucket: "imageuploaddb-3c249.appspot.com",
  messagingSenderId: "310749753393",
  appId: "1:310749753393:web:cdf6c2b8fcd53b9168a510",
  measurementId: "G-DW4XGCVJ48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app);