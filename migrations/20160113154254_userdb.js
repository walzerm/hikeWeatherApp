
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name');
        table.string('facebook_id');
        table.text('description');
        table.string('email');
        table.string('password');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
