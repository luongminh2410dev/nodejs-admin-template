const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://...', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('Connect failed')
    }
}

module.exports = { connect };