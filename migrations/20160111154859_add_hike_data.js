
exports.up = function(knex, Promise) {
    return knex.schema.createTable('hikesInfo', function(table) {
        table.increments();
        table.string('name');
        table.string('length');
        table.string('elevation');
        table.string('highPoint');
        table.string('url');
        table.text('description');
        table.decimal('latitude');
        table.decimal('longitude');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('hikesInfo');
};

//migrate down to undoo
