
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fav_hikes', function(table) {
        table.increments();
        table.float('list_id');
        table.float('hike_id');
        table.string('hike_url');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fav_hikes');
};
