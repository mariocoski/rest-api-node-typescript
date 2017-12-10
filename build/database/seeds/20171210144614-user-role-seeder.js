'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('user_role', [{
                user_id: 1,
                role_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            }], { individualHooks: true });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user_role', null, {});
    }
};
//# sourceMappingURL=20171210144614-user-role-seeder.js.map