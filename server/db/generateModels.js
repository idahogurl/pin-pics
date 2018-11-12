const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto('pin_pics', '', '', { dialect: 'postgres' });

auto.run((err) => {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
