import firebase from 'firebase';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyBkLaohp-Gm56OUnPetImLOTg46gV6LSQA",
        authDomain: "pwa-app-36fe6.firebaseapp.com",
        databaseURL: "https://pwa-app-36fe6.firebaseio.com",
        projectId: "pwa-app-36fe6",
        storageBucket: "pwa-app-36fe6.appspot.com",
        messagingSenderId: "938674404737"
    });

    // subscribe the service worker to user right after it is registered successfully
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
        firebase.messaging().useServiceWorker(registration);
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              'BKCWz7kE-vlcFudrN0S4M9z-RTZVp8J-ncVbYQoRgObAeDfJEO8bHNYL0dgtTlpxRclWNUci_YwvfYUtbUK9lqQ'
            )
          };
        return registration.pushManager.subscribe(subscribeOptions);
    }).then(function(pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
    }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    });
}