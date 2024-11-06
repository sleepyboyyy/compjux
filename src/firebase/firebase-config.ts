// config file
const config = {
    apiKey: "AIzaSyClWO2wA660tvsERAfwg74ZZGs0C0zbwgU",
    authDomain: "compjux.firebaseapp.com",
    projectId: "compjux",
    storageBucket: "compjux.appspot.com",
    messagingSenderId: "6918454220",
    appId: "1:6918454220:web:ed2d34e86e728da900bb69"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
            'Add your web app\'s configuration object to firebase-config.ts');
    } else {
        return config;
    }
}


