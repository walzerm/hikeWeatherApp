
exports.up = function(knex, Promise) {
    return knex.schema.createTable('hikesinfo', function(table) {
        table.increments();
        table.string('name');
        table.float('length',8,5);
        table.float('elevation',8,5);
        table.float('highPoint',8,5);
        table.string('url');
        table.text('description');
        table.decimal('latitude', 10, 5);
        table.decimal('longitude', 10, 5);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('hikesinfo');
};

//migrate down to undoo
