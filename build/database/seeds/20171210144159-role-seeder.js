'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('roles', [{
                name: 'admin',
                description: 'Has all possible permissions across the app',
                created_at: new Date(),
                updated_at: new Date()
            }], { individualHooks: true });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
//# sourceMappingURL=20171210144159-role-seeder.js.map