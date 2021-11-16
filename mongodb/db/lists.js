const { ObjectId } = require("bson");
const { List, User, Item } = require("../models");

const getLists = async (username) => {
  const user = await User.findOne({ username });
  let lists = [];
  for (let i = 0; i < user.listsIDs.length; i++) {
    const listID = user.listsIDs[i];
    let list = await List.findOne({
      _id: ObjectId(listID.listId),
    });
    lists.push(list);
  }
  return lists;
};

const createList = async (listFields, username) => {
  const list = new List({ ...listFields });
  const res = await list.save();
  const usersOtherLists = await User.findOne({ username: username });
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

const deleteList = async (listID, username) => {
  const res = await List.deleteOne({ _id: ObjectId(listID) });
  const user = await User.findOne({ username: username });

  let listsIDsFinal = [];
  for (let i = 0; i < user.listsIDs.length; i++) {
    if (user.listsIDs[i].listId !== listID) {
      listsIDsFinal.push(user.listsIDs[i]);
    }
  }

  console.log(listsIDsFinal.length);
  await User.updateOne(
    { username: username },
    {
      listsIDs: listsIDsFinal,
    }
  );
  return { ...res };
};

const getListItems = async (username, listID) => {
  const list = await List.findOne({ _id: ObjectId(listID) });

  let listItems = [];
  let listItemsIDs = list.itemsIDs;
  for (let i = 0; i < listItemsIDs.length; i++) {
    const item = await Item.findOne({ _id: ObjectId(listItemsIDs[i]) });
    listItems.push(item);
  }
  return listItems;
};

const createListItem = async (listItem, username, listID) => {
  const item = new Item({ ...listItem });
  const res = await item.save();

  let list = await List.findOne({ _id: ObjectId(listID) });
  console.log(list);
  list.itemsIDs.push(res._id);
  await List.updateOne(
    {
      _id: ObjectId(listID),
    },
    {
      itemsIDs: list.itemsIDs,
    }
  );
  return res;
};

const updateListItem = async (listItem, username, itemID) => {
  const res = await Item.updateOne(
    {
      _id: ObjectId(itemID),
    },
    {
      ...listItem,
    }
  );

  return res;
};

module.exports = {
  getLists,
  createList,
  deleteList,
  getListItems,
  createListItem,
  updateListItem,
};
