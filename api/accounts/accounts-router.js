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

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
  const updatedAccount = await Account.updateById(req.params.id, req.body)
  res.status(200).json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
  const deletedAccount = await Account.deleteById(req.params.id)
  res.json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
