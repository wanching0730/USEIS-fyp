importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.3/firebase.js');

firebase.initializeApp({
    messagingSenderId: "938674404737"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    const title = payload.notification.title;
    console.log('payload', payload.notification.icon);
    const options = {
       body: payload.notification.body,
       icon: payload.notification.icon
    }
    return self.registration.showNotification(title, options);
 })