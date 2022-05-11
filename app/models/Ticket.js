module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    'Ticket',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: DataTypes.STRING(50),
      description: DataTypes.TEXT,
      creator_user: DataTypes.STRING(50),
      assigned_user: DataTypes.STRING(50),
      status_id: DataTypes.INTEGER,
      assignment_date: DataTypes.DATE,
      resolution_date: DataTypes.DATE,
    },
    {
      underscored: true,
    },
  );

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Status, {
      as: 'Status',
      foreignKey: 'status_id',
    });
  };
  return Ticket;
};
