
exports.up = function(knex, Promise) {
    return knex.schema.createTable('favhikes', function(table) {
        table.increments();
        table.float('user_id');
        table.float('hike_id');
        table.string('list_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('favhikes');
};
