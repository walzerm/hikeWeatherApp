
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fav_hikes_lists', function(table) {
        table.increments();
        table.float('user_id');
        table.string('list_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fav_hikes_lists');
};
