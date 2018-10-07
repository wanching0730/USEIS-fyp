import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "938674404737"
  });

  navigator.serviceWorker
    .register('/registerServiceWorker.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
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