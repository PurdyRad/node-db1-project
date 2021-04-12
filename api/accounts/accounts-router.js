const {checkAccountId,
   checkAccountPayload,
    checkAccountNameUnique} = require('./accounts-middleware');
const Account = require('./accounts-model');

const router = require('express').Router()

router.get('/', (req, res, next) => {
  Account.getAll()
  .then(accounts => {
    res.status(200).json(accounts)
  })
  .catch(err => {
    next(err);
  })
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    console.log('req.body:', req.body)
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
