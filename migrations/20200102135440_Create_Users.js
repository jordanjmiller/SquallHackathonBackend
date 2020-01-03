exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('firstname', 255)
            .notNullable()
        tbl.string('lastname', 255)
            .notNullable();
        tbl.string('email', 255)
            .notNullable()
            .unique(); 
        tbl.integer('phonenumber', 255)
            .notNullable()
            .unique();
        tbl.string('city', 255)
            .notNullable();
        tbl.string('password', 255)
            .notNullable();
            tbl.boolean('extremeCold', 255)
                .notNullable();
            tbl.boolean('extremeHot', 255)
                .notNullable();
            tbl.boolean('highWinds', 255)
                .notNullable();
            tbl.boolean('heavyRain', 255)
                .notNullable();
            tbl.boolean('lightning', 255)
                .notNullable();
            tbl.boolean('hail', 255)
                .notNullable();
            tbl.boolean('flashFlooding', 255)
                .notNullable();
            tbl.boolean('snowShowers', 255)
                .notNullable();
            tbl.boolean('blizzard', 255)
                .notNullable();
            tbl.boolean('tornado', 255)
                .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
