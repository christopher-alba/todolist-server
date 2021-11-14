const { List, User } = require("../models");

const getLists = (username) => {
  const listsIDs = User.findOne({ username }).lists;
  const lists = [];
  listsIDs.forEach((listID) => {
    const list = List.findById(listID);
    lists.push(list);
  });
  return lists;
};

const createList = () => {};

const deleteList = () => {};

module.exports = {
  getLists,
};
