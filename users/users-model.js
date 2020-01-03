const db = require('../data/db-config');

module.exports = {
    findBy,
    findById,
    add,
    update,
    remove,
}

function findBy(value){
    return db('users')
        .where(value)
        .first();
}

function add(user){
    return db('users')
    .insert(user, 'id');
}

function findById(id){
    return db('users as u')
    .where({'u.id': id})
    .select('u.id', 'u.username', 'u.name', 'u.email',)
    .first();
}

function update(id, user){
    return db('users')
    .where({id})
    .update({...user});
}

async function remove(id){
    await db.transaction(async trx => {
        try{
             await trx('users')
            .where({id});

            const userDeleted = await trx('users')
            .where({id})
            .del();
            
            if(!userDeleted){
                throw 'Error deleting user'
            }

            return true;
        }catch(err){
            throw err;
        }
    });
}