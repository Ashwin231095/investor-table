//@ts-check
var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const pgPromise = require('pg-promise');
var router = express.Router();

var pgp = pgPromise({
    // Initialization Options
});
var connectionString =`postgres://postgres:postgres@localhost:5433/investors`;
var db =  pgp(connectionString);
var jsonParser = bodyParser.json()

/* GET users listing. */
router.put('/', jsonParser, async function(req, res, next) {
    var passwordHashArray = await db.query(`select パスワード, 役割, 名 from ユーザー where Eメール ='${req.body.email}'`);
    var passwordHash = passwordHashArray[0];
    var passwordMatch = req.body.password === passwordHash.パスワード;
    res.send({match: passwordMatch, role: passwordHash.役割, name: passwordHash.名});
});

router.get('/get-investor', jsonParser, async (req, res, next) => {
    var investors = await db.query(`select * from investor`);
    res.send(investors);
});
router.post('/add-investor', jsonParser, async (req, res, next) => {
    var reqBody = req.body;
    await db.query(`insert into investor (user_id, email, investor_name, allocation, equity)
    values ('${reqBody.id}', '${reqBody.email}', '${reqBody.investor_name}', '${reqBody.allocation}', '${reqBody.equity}')`);
    res.send('the res');
});
router.put('/update-investor', jsonParser, async (req, res, next) => {
    var reqBody = req.body;
    await db.query(`UPDATE investor SET email = '${reqBody.email}', investor_name= '${reqBody.investor_name}',
    allocation = '${reqBody.allocation}', equity = '${reqBody.equity}' where user_id = '${reqBody.id}'`);
    res.send('the res');
});

module.exports = router;
