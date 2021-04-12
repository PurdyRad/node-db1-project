const Account = require('./accounts-model');

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({message: "name and budget are required" });
  } else if (typeof name !== "string") {
    res.status(400).json({message: "name of account must be a string"});
  
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({message: "name of account must be between 3 and 100"});
  } else if (typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget.length < 0 || budget.length > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

const checkAccountNameUnique = (req, res, next) => {
  const {name} = req.body;
  if (typeof name.trim() !== "undefined") {
    next();
  } else {
    res.status(400).json({ message: "that name is taken" })
  }
}

const checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" })
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
};