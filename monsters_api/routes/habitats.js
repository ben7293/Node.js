const {Router} = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});

router.get('/:id', (request, response, next) => {
    const {id} = request.params;
    pool.query('SELECT * FROM habitats WHERE id=$1 ORDER BY id ASC', [id], (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {
    const {name, habitat, temperature} = request.body;
    pool.query(
        'INSERT INTO habitats(name, habitat, temperature) \
        VALUES($1, $2, $3)', 
        [name, habitat, temperature],
        (err, res) => {
            if (err) return next(err);
            response.redirect('/habitats');
    });    
});

router.delete('/:id', (request, response, next) => {
    const {id} = request.params;
    pool.query('DELETE FROM habitats WHERE id=$1', [id], (err, res) => {
        if (err) return next(err);
        response.redirect('/habitats');
    });
});

module.exports = router;