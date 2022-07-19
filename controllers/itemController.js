let items = require('../items');

const getItems = (req, reply) => {
  reply.send(items);
};

const getItem = (req, reply) => {
  const item = items.find((item) => item.id.toString() === req.params.id);
  reply.send(item);
};

const addItem = (req, reply) => {
  const item = {
    id: items.length + 1,
    name: req.body.name,
  };
  items = [...items, item];

  reply.code(201).send(item);
};

const deleteItem = (req, reply) => {
  items = items.filter((item) => item.id.toString() !== req.params.id);

  reply.send({ message: 'Item Deleted' });
};

const updateItem = (req, reply) => {
  items = items.map((item) =>
    item.id.toString() === req.params.id
      ? { id: req.params.id, name: req.body.name }
      : item
  );

  const item = items.find((item) => item.id.toString() === req.params.id);

  reply.send(item);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
};
