
exports.up = function(knex, Promise) {
    return knex.schema.createTable('hikesinfo', function(table) {
        table.increments();
        table.string('name');
        table.string('length');
        table.string('elevation');
        table.string('highPoint');
        table.string('url');
        table.text('description');
        table.decimal('latitude', 10, 5);
        table.decimal('longitude', 10, 5);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('hikesInfo');
};

//migrate down to undoo
