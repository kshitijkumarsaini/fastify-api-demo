const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require('../controllers/itemController');
const items = require('../items');

// Item Schema
const Item = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
  },
};

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  // handler: function (req, reply) {
  //   reply.send(items);
  // },
  handler: getItems,
};

// Options to get single item
const getItemOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', default: '1' },
      },
    },
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

// Option to add single item
const postItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', default: 'Fourth item' },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

// Option to delete single item
const deleteItemOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', default: '1' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteItem,
};

// Option to update an item
const updateItemOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', default: '1' },
      },
    },
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', default: 'This is first item' },
      },
    },
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

function itemRoutes(fastify, option, done) {
  // Get all items
  fastify.get('/items', getItemsOpts);

  // Get single item
  // fastify.get('/items/:id', getItemOpts, (req, reply) => {
  //   const item = items.find((item) => item.id.toString() === req.params.id);
  //   reply.send(item);
  // });

  fastify.get('/items/:id', getItemOpts);

  // Add an item
  fastify.post('/items', postItemOpts);

  // Delete an item
  fastify.delete('/items/:id', deleteItemOpts);

  // Update an item
  fastify.put('/items/:id', updateItemOpts);

  done();
}

module.exports = itemRoutes;
