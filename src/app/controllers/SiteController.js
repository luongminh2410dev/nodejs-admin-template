const Account = require('../models/Account');
const { validString } = require('../../ultilities/encyption');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/jwt');
class SiteController {
    // [GET] /
    index(req, res) {
        res.render('analyst');
    }
    // [GET] /search
    search(req, res) {
        res.send('search')
    }
    // [GET] /login
    login(req, res) {
        res.render('login', { layout: false })
    }
    // [POST] /login
    auth(req, res, next) {
        const { username, password } = req.body;
        Account.findOne({ username })
            .then(account => {
                const errorMessage = {
                    layout: false,
                    message: 'Tài khoản hoặc mật khẩu không chính xác',
                    success: false
                }
                if (account) {
                    if (!validString(password, account.password)) {
                        return res.render('login', errorMessage)
                    }
                    // create token
                    const payload = {
                        name: account._id,
                        scopes: ["account:auth"]
                    }
                    const token = jwt.sign(payload, JWT_SECRET);
                    req.session.loggedin = true;
                    req.session.userInfo = account;
                    req.session.token = token;
                    // res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')})
                    return res.redirect('/trang-chu');
                }
                return res.render('login', errorMessage)
            })
            .catch(next)
    }
    // [GET] /logout
    logout(req, res) {
        // delete session object
        if (req.session) {
            req.session.destroy(function (err) {
                err ?
                    next(err)
                    :
                    res.redirect('login')
            });
        }
    }
}
module.exports = new SiteController;