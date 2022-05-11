module.exports = {
  async up(queryInterface) {
    const date = new Date();
    const tickets = [
      {
        subject: 'ejemplo ticket',
        description: 'Esta es la descrición del ticket',
        creator_user: 'melena',
        assigned_user: 'aduartem',
        status_id: 1,
        created_at: date,
        assignment_date: date,
        resolution_date: null,
        updated_at: date,
      },
      {
        subject: 'ejemplo ticket 2',
        description: 'Esta es la descrición del ticket',
        creator_user: 'melena',
        assigned_user: 'franco1',
        status_id: 1,
        created_at: date,
        assignment_date: date,
        resolution_date: null,
        updated_at: date,
      },
      {
        subject: 'ejemplo ticket 3',
        description: 'Esta es la descrición del ticket',
        creator_user: 'melena',
        assigned_user: 'aduartem',
        status_id: 1,
        created_at: date,
        assignment_date: date,
        resolution_date: null,
        updated_at: date,
      },
      {
        subject: 'ejemplo ticket 4',
        description: 'Esta es la descrición del ticket',
        creator_user: 'melena',
        assigned_user: 'aduartem',
        status_id: 1,
        created_at: date,
        assignment_date: date,
        resolution_date: null,
        updated_at: date,
      },
    ];
    await queryInterface.bulkInsert('tickets', tickets, {});
  },
};
