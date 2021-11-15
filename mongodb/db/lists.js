const { ObjectId } = require("bson");
const { List, User } = require("../models");

const getLists = async (username) => {
  const user = await User.findOne({ username });
  let lists = [];
  for (let i = 0; i < user.listsIDs.length; i++) {
    const listID = user.listsIDs[i];
    console.log(listID);
    let list = await List.findOne({
      _id: ObjectId(listID.listId),
    });
    lists.push(list);
  }

  console.log(lists);
  return lists;
};

const createList = async (listFields, username) => {
  const list = new List({ ...listFields });
  const res = await list.save();
  const usersOtherLists = await User.findOne({ username: username });
  console.log(usersOtherLists.listsIDs);
  let listsIDsFinal = [];

  for (let i = 0; i < usersOtherLists.listsIDs.length; i++) {
    listsIDsFinal.push(usersOtherLists.listsIDs[i]);
  }
  listsIDsFinal.push({
    listId: res._id,
  });

  await User.updateOne(
    { username: username },
    {
      listsIDs: listsIDsFinal,
    }
  );

  return { ...res._doc };
};

const deleteList = (listID, username) => {
  List.deleteOne({ _id: listID });
};

module.exports = {
  getLists,
  createList,
  deleteList,
};
