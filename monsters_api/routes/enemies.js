const {Router} = require('express');
const pool = require('../db');

const router = Router();


router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM enemies ORDER BY monster1 ASC', (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {
    const{monster1, monster2} = request.body;
    pool.query('INSERT INTO enemies(monster1, monster2) VALUES ($1, $2)', [monster1, monster2], (err, res) => {
        if (err) return next(err);
        response.redirect('/enemies');
    });
});


module.exports = router;