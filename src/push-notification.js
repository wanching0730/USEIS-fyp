import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBkLaohp-Gm56OUnPetImLOTg46gV6LSQA",
    authDomain: "pwa-app-36fe6.firebaseapp.com",
    databaseURL: "https://pwa-app-36fe6.firebaseio.com",
    projectId: "pwa-app-36fe6",
    storageBucket: "pwa-app-36fe6.appspot.com",
    messagingSenderId: "938674404737"
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
      firebase.messaging().useServiceWorker(registration);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }

  navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
        return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
        });
    })
    .then(function(subscription) {console.log(subscription.endpoint);});

//   navigator.serviceWorker
//     .register('../firebase-messaging-sw.js', {
//         scope: '/'
//     }).then((registration) => {
//       firebase.messaging().useServiceWorker(registration);
//     });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token for noti permission:', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
}

export function initializePush() {
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BKCWz7kE-vlcFudrN0S4M9z-RTZVp8J-ncVbYQoRgObAeDfJEO8bHNYL0dgtTlpxRclWNUci_YwvfYUtbUK9lqQ");
    messaging
        .requestPermission()
        .then(() => {
            console.log("Have Permission");
            return messaging.getToken();
        })
        .then(token => {
            console.log("FCM Token:", token);
            //you probably want to send your new found FCM token to the
            //application server so that they can send any push
            //notification to you.
        })
        .catch(error => {
            if (error.code === "messaging/permission-blocked") {
                console.log("Please Unblock Notification Request Manually");
            } else {
                console.log("Error Occurred", error);
            }
            });
}