"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const auth = firebase.auth();

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // Authenticate the user
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const userData = Object.assign({}, user.providerData[0]);

    const token = await user.getIdToken();
    // Add the user to firestore
    const userRef = await firestore.collection("users").add(userData);
    console.log("Document written with ID: " + userRef.id);

    res.status(200).json({
      status: "Success",
      token,
      data: userData,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failure",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const { user } = await auth.signInWithEmailAndPassword(email, password);

    const userObj = user.providerData[0];

    res.status(200).json({
      status: "Success",
      data: userObj,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failure",
      error: error.message,
    });
  }
};

const signout = async (req, res, next) => {
  try {
    await auth.signOut();
    res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failure",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  signout,
};
