module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    'Status',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
    },
    {
      underscored: true,
    },
  );
  return Status;
};
