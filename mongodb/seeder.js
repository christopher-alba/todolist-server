const { db } = require("./connection");
const { List, User } = require("./models");
const usersDB = db.collection("users");
const listsDB = db.collection("lists");

runSeeder();

async function runSeeder() {
  await listsDB.deleteMany({}, () => {
    console.log("Deleted All lists");
  });

  const listArray = [];

  for (let i = 0; i < 10; i++) {
    listArray.push({
      name: "List no xD " + i,
      itemsIDs: [],
    });
  }

  await listsDB.insertMany(listArray, () => {
    console.log("Inserted new lists to DB");
  });

  setTimeout(async () => {
    const listArrayDB = await List.find();
    console.log(listArrayDB);
    const listsIDs = [];
    for (let i = 0; i < listArrayDB.length; i++) {
      let listDB = listArrayDB[i];
      listsIDs.push({ listId: listDB._id });
    }

    console.log(listsIDs);

    const response = await User.updateOne(
      { username: "username" },
      {
        listsIDs: listsIDs,
      }
    );
    console.log(response);

    db.close();
  }, 1000);
}
