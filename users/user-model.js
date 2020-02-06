const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findById,
    findBy,
    update,
    remove,
    findByName
}

function find() {
    return db.select('*').from('users')
}

function findById(id) {
    return db('users').where({id})
    .first();
}


function findBy(filter) {
    return db("users")
        .where(filter);
}


function add(user) {
    return db('users')
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function update(id, user) {
    return db('users')
    .where({ id })
    .update(user, '*');
}

function remove(id) {
    return db('users')
    .where('id', Number(id))
    .del();
}

function findByName(username) {
    return db('users')
        .select('username')
        .where({ username })
        .first()
}

