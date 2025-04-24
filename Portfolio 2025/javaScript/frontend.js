//Firebase configuration for messaging
import { firebase } from "firebase/app";

import { firebaseConfig } from "./firebase-config.js";

firebase.initializeApp(firebaseConfig);

const contactFormDB= firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e){
  e.preventDefault();

  var name = getElementVal("name");
  var email = getElementVal("email");
  var message = getElementVal("message");

  console.log(name, email, message);
  saveMessages(name, email, message);

}

const saveMessages = (name, email, message) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    email: email,
    message: message
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
}

