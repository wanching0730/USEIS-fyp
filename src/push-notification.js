import firebase from 'firebase';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
      ;
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

    // navigator.serviceWorker.ready.then(function(reg) {
    //     reg.pushManager.getSubscription().then(function(subscription) {
    //         console.log("subs: " + JSON.stringify(subscription));
    //       subscription.unsubscribe().then(function(successful) {
    //         console.log(successful);
    //       }).catch(function(e) {
    //         console.log(e);
    //       })
    //     })        
    //   });

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

    // setTimeout(() => {
    //     navigator.serviceWorker.ready
    //         .then(function(serviceWorkerRegistration) {
    //             return serviceWorkerRegistration.pushManager.subscribe({
    //                 userVisibleOnly: true,
    //                 applicationServerKey: urlBase64ToUint8Array(
    //                     'BDq28YOZ7UT6TLuTeG4nClUtqCQky82AAshtQ2LlbN6oOCHFAQcAFqeRkQ48ZxGYOKbRT05ytbZlI_f8Yz3t6EU'
    //                 )
    //             });
    //         })
    //         .then(function(subscription) {console.log("subscribed: " + subscription.endpoint);
    //     });
    //   }, 6000);

    const messaging = firebase.messaging();

    // self.addEventListener('push', function(event) {

    //     var apiPath = '<apiPath>';
    //     event.waitUntil(registration.pushManager.getSubscription().then(function (subscription){
        
    //         return fetch(apiPath).then(function(response){
    //             if(response.status !== 200){
    //                 throw new Error();
    //             }
        
    //             return response.json().then(function(data){
    //                 var title = data.title;
    //                 var message = data.body;
    //                 var icon = data.icon;
    //                 var tag = data.tag;
    //                 var url = data.url;
    //                 return self.registration.showNotification(title,{
    //                    body: message,
    //                    icon: icon,
    //                    tag: tag,
    //                    data: url
    //                 });
    //             })
    //         }).catch(function(err){
        
    //         })
        
    //     }));
    //     return;
    //     });

    messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);
    });
}

// export function initializePush() {
//     const messaging = firebase.messaging();
//     messaging
//     .requestPermission()
//     .then(() => {
//         console.log("Have Permission");
//         return messaging.getToken();
//     })
//     .then(token => {
//         console.log("FCM Token:", token);
//         messaging.usePublicVapidKey("BKCWz7kE-vlcFudrN0S4M9z-RTZVp8J-ncVbYQoRgObAeDfJEO8bHNYL0dgtTlpxRclWNUci_YwvfYUtbUK9lqQ");
//         fetch(`http://localhost:5000/get/notification/` + token);
//         //you probably want to send your new found FCM token to the
//         //application server so that they can send any push
//         //notification to you.
//     })
//     .catch(error => {
//         if (error.code === "messaging/permission-blocked") {
//             console.log("Please Unblock Notification Request Manually");
//         } else {
//             console.log("Error Occurred", error);
//         }
//     });

//     messaging.onMessage(function(payload) {
//         console.log('Message received. ', payload);
//         // ...
//     });
// }