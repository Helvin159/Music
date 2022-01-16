import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJVgKa7Jse7X_u4BEGIe-GsgLnf59pmqY",
	authDomain: "music-71c15.firebaseapp.com",
	projectId: "music-71c15",
	storageBucket: "music-71c15.appspot.com",
	messagingSenderId: "802670668906",
	appId: "1:802670668906:web:155d021aee9dd8f841ee13",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
	auth,
	db,
	storage,
	usersCollection,
	songsCollection,
	commentsCollection,
};
