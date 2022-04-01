const Account = require('../models/Account');
const { mongooseToObject } = require('../../ultilities/mongoose');

class AccountController {
    // [GET] /account?_id
    index(req, res, next) {
        const { _id } = req.query;
        Account.findOne({ _id })
            .then(account => {
                if (account) {
                    return res.render('account/show', { account: mongooseToObject(account) })
                }
                next()
            })
            .catch(next);
    }
}
module.exports = new AccountController;