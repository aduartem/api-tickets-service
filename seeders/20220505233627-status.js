module.exports = {
  async up(queryInterface) {
    const date = new Date();
    const statuses = [
      {
        name: 'Por resolver',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Resuelto',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Rechazado',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Anulado',
        created_at: date,
        updated_at: date,
      },
    ];
    await queryInterface.bulkInsert('statuses', statuses, {});
  },
};
