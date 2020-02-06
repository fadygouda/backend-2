const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findById,
    update,
    remove
}

function find() {
    return db.select('*').from('songs')
}

function findById(id) {
    return db('songs').where({id})
}

function add(song) {
    return db('songs')
        .insert(song, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function update(id, changes) {
    return db("users")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('users')
        .where('id', Number(id))
        .del();
}        