import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: proces.env.REACT_APP_API_KEY,
    authDomain: proces.env.REACT_APP_AUTH_DOMAIN,
    projectId: proces.env.REACT_APP_PROJECT_ID,
    storageBucket: proces.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: proces.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: proces.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
export default storage;