import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyAcTG1wCbSfVqH_2NjqcX3ndpWm8EsDijU",
  authDomain: "rj-clothing.firebaseapp.com",
  projectId: "rj-clothing",
  storageBucket: "rj-clothing.appspot.com",
  messagingSenderId: "543142060899",
  appId: "1:543142060899:web:8ade3c00eaceb4761ea956"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })

      console.log('user creation successfull.')
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase