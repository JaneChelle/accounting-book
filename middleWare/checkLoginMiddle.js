module.exports = (req, res, next) => {
    console.log('req::session', req);
    console.log('req?.session: ', req?.session);


    if (!req?.session?.username) {
        return res.redirect('/login')
    }
    next()
}