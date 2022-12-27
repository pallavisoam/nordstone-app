import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAMguIcOyMuDn4HFtX7IZcQV9Cz4Qr3TIU',
    authDomain: 'nordston-app.firebaseapp.com',
    projectId: 'nordston-app',
    storageBucket: 'nordston-app.appspot.com',
    messagingSenderId: '374695379768',
    appId: '1:374695379768:web:d13854efa72f33f66877cd'
}

const app = initializeApp(firebaseConfig)
// firebase.firestore().settings({ experimentalForceLongPolling: true })
const db = getFirestore(app)
const storage = getStorage(app)
export const auth = getAuth(app)
export { db, storage }
export default app
