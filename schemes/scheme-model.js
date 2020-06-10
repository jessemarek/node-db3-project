const db = require('../data/db-connection')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where('id', id)
        .first()
}

function findSteps(id) {
    return db('steps')
        .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
        .where('steps.scheme_id', id)
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .orderBy('steps.step_number')

}

function add(data) {
    return db('schemes')
        .insert(data)
        .then(([id]) => findById(id))
}

function update(data, id) {
    return db('schemes')
        .where('id', id)
        .update(data)
        .then(count => count ? findById(id) : 0)
}

async function remove(id) {
    const scheme = await findById(id)

    return db('schemes')
        .where('id', id)
        .del()
        .then(count => count ? scheme : count)
}