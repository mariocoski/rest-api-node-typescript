'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('permissions', [
            {
                name: 'user.store',
                label: 'Create user',
                description: 'Allows to create a new user',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'users.index',
                label: 'Get all users',
                description: 'Allows to get all users',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'user.show',
                label: 'Get user',
                description: 'Allows to get user for a given id',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'user.update',
                label: 'Update user',
                description: 'Allows to update/replace entire user resource, contains complete resource',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'user.delete',
                label: 'Delete user',
                description: 'Soft deletes user by a given id',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], { individualHooks: true });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('permissions', null, {});
    }
};
//# sourceMappingURL=20171210144805-permission-seeder.js.map