const {Strategy, ExtractJwt} = require('passport-jwt');

module.exports = new Strategy(
    {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter(process.env.JWT_PARAM_NAME)
    },
    async (token, done) => {
        try {
            done(null, token.user);
        } catch(e) {
            done(e);
        }
    }
)