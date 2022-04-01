const siteRouter = require('./site');
const accountRouter = require('./account');
function route(app) {
    app.use('/account', accountRouter);
    app.use('/', siteRouter);

    // Handle 404 NOT FOUND
    app.use((req, res) => {
        return res.render('404', { layout: false });
    })
}

module.exports = route;