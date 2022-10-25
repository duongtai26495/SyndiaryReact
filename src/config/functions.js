import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { FIREBASE_UID } from "../store/constants";
import { app, database } from "./firebase";
import {
    getDatabase,
    off,
    ref,
    set,
    push,
    onValue,
    child
} from "firebase/database";
import { v4 } from "uuid";

const registerWithEmailAndPassword = async (User) => {
    var user = null;
    let fullname = User.fullname
    let username = User.username
    let password = User.password


    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            // ...
        });

    return user;
}

const logInWithEmailAndPassword = async (User) => {
    var user = null;

    let username = User.username
    let password = User.password

    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            user = userCredential.user;
            CheckUserLoggedIn()
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            // ...
        });

    return user;
}

const CheckUserLoggedIn = () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            localStorage.setItem(FIREBASE_UID, uid)
            console.log("User logged in", uid)
            // ...
        } else {
            // User is signed out
            // ...
            console.log("User do not login")
        }
    });
}

const logoutFunction = () => {
    const auth = getAuth(app);
    signOut(auth)
        .then(() => {
            localStorage.removeItem(FIREBASE_UID)
            console.log("Sign out success")
        })
        .catch((error) => {
            console.log("Sign out failed", error)
        })
}

const CheckLocalUID = () => {
    return localStorage.getItem(FIREBASE_UID);
}


const writeNewDiary = async content => {
    const uid = localStorage.getItem(FIREBASE_UID)
    if (uid !== null) {
        const db = getDatabase(app)
        const date = new Date();
        const time_now = date.toLocaleString();
        await set(ref(db, 'Diaries/' + uid + '/' + v4()), {
            content,
            created_at: time_now,
            updated_at: time_now,
            done: false,
            show: true,
        });
    }
}

const getDiaries = () => {
    var Diaries = []
    const uid = localStorage.getItem(FIREBASE_UID)
    const db = getDatabase(app);
    const postListRef = ref(db, 'Diaries/' + uid + '/');
    onValue(postListRef, (snapshot) => {
        let listDiaries = []
        snapshot.forEach(childSnapshot => {
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            listDiaries.push({ 
                "key": key, 
                "data": data
            })
        });
        
        listDiaries.forEach((diary) => {
            console.log(diary)
        })
    })
    return Diaries
}

export {
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    CheckUserLoggedIn,
    logoutFunction,
    CheckLocalUID,
    writeNewDiary,
    getDiaries
}

