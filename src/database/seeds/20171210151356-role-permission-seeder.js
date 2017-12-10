'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role_permission', [
      {
        role_id: 1,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        permission_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_id: 1,
        permission_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
    ],{ individualHooks: true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role_permission', null, {});
  }
};