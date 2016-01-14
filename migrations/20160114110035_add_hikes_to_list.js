
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fav_hikes', function(table) {
        table.increments();
        table.float('list_id');
        table.float('hike_id');
    })
};

exports.down = function(knex, Promise) {
    return knes.schema.dropTable('fav_hikes');
};
