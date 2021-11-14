const { db } = require("./connection");
const { encryptPassword } = require("../util");
const usersDB = db.collection("users");

usersDB.deleteMany({}, () => {
  console.log("users have been deleted");
});
encryptPassword("password").then((response) => {
  console.log(response);
  usersDB
    .insertOne({
      username: "username",
      password: response,
    })
    .then(() => {
      db.close();
      console.log("User has been inserted");
    });
});
