'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [{
      user_id: 1,
      title: 'First article',
      body: 'This is my first article.. Tell me your thoughts in comments..',
      created_at: new Date(),
      updated_at: new Date()
    }],{ individualHooks: true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
