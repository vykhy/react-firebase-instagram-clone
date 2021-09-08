import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'


//import seed file
//import { seedDatabase } from '../seed'

const config = {
    apiKey: "AIzaSyAIMqwjVVHAalCMAS8rEVy49rd52I2NHtA",
    authDomain: "instagram-clone-a6ecc.firebaseapp.com",
    projectId: "instagram-clone-a6ecc",
    storageBucket: "instagram-clone-a6ecc.appspot.com",
    messagingSenderId: "571319288310",
    appId: "1:571319288310:web:a28cbbab87f616ea7887d7"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

//call seed file only once
//seedDatabase(firebase)

export { firebase, FieldValue };