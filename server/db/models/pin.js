module.exports = (sequelize, DataTypes) => {
  const Pin = sequelize.define(
    'Pin',
    {
      id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url',
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'pins',
      timestamps: true,
      underscored: true,
      indexes: [
        // A BTREE index with a ordered field
        {
          name: 'user_id_idx',
          method: 'BTREE',
          fields: ['id'],
        },
      ],
    },
  );

  Pin.associate = ({ User }) => {
    Pin.belongsTo(User);
  };

  return Pin;
};
