module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
      },
      screenName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'screen_name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
    },
  );

  User.associate = ({ Pin }) => {
    User.hasMany(Pin);
  };

  return User;
};
