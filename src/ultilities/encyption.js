const bcrypt = require('bcryptjs');
module.exports = {
    encryptString: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    },
    validString: function (password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}