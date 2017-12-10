'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstname: 'Joe',
        lastname: 'Admin',
        bio: 'I have been admins for years...',
        email: 'joe@test.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Editor',
        bio: 'I have been editor for years...',
        email: 'jane@test.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date()
      }
    ],{ individualHooks: true });
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('users', null, {});
  }
};
