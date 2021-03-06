const graphqlToolsTypes = require('graphql-tools-types');

const models = require('../db/models');

const parseOrder = function parseOrder(order) {
  if (order) {
    const columns = order.split(', ');
    const columnOrder = columns.map((c) => c.split(' '));
    return columnOrder;
  }

  return [];
};

const parseWhere = function parseWhere(where) {
  if (where) {
    return JSON.parse(where);
  }

  return {};
};

module.exports = {
  UUID: graphqlToolsTypes.UUID({
    name: 'UUID',
    storage: 'string',
  }),
  JSON: graphqlToolsTypes.JSON({
    name: 'JSON',
  }),
  Date: graphqlToolsTypes.Date({
    name: 'Date',
  }),
  Void: graphqlToolsTypes.Void({
    name: 'Void',
  }),
  Mutation: {
    createPin: async (_, {
      input,
    }) => {
      const pin = await models.Pin.create(input.pin);
      return {
        pin,
      };
    },
    updatePinById: async (_, {
      input,
    }) => {
      const pin = await models.Pin.findById(input.id);
      await pin.update(input.pinPatch);
      return {
        pin,
      };
    },
    deletePinById: async (_, {
      input,
    }) => {
      const pin = await models.Pin.findById(input.id);
      await pin.destroy();
      return {
        pin,
      };
    },
    createUser: async (_, {
      input,
    }) => {
      const user = await models.User.create(input.user);
      return {
        user,
      };
    },
    updateUserById: async (_, {
      input,
    }) => {
      const user = await models.User.findById(input.id);
      await user.update(input.userPatch);
      return {
        user,
      };
    },
    deleteUserById: async (_, {
      input,
    }) => {
      const user = await models.User.findById(input.id);
      await user.destroy();
      return {
        user,
      };
    },
  },
  Query: {
    pins: async (_, params) => {
      console.log(params);
      const pins = await models.Pin.findAll({
        limit: params.limit,
        order: parseOrder(params.order),
        where: parseWhere(params.where),
        offset: params.offset,
      });
      return pins;
    },
    pin: async (_, {
      id,
    }) => {
      const book = await models.Pin.findById(id);
      return book;
    },
    users: async (_, {
      limit,
      order,
      where,
      offset,
    }) => {
      const users = await models.User.findAll(limit, parseOrder(order), parseWhere(where), offset);
      return users;
    },
    user: async (_, {
      id,
    }) => {
      const user = await models.User.findById(id);
      return user;
    },
  },
  Pin: {
    user: async (pin) => {
      const user = await pin.getUser();
      return user;
    },
  },
  User: {
    pins: async (user, {
      limit,
      order,
      where,
      offset,
    }) => {
      const pins = await models.User.getPins({
        limit,
        order: parseOrder(order),
        where: parseWhere(where),
        offset,
      });
      return pins;
    },
  },
};
