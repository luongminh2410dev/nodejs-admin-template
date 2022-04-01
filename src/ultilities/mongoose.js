const fs = require('fs');
const path = require('path');
module.exports = {
    mutipleMongooseToObject: function (array) {
        return array.map(item => item.toObject());
    },
    mongooseToObject: function (object) {
        return object ? object.toObject() : object;
    },
    removeImageFromStorage: function (image) {
        var filePath = path.join(__dirname, `../../public/uploads/${image}`);
        fs.unlinkSync(filePath);
    }
}