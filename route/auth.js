const User = require('../model/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');

class AuthRoutes {
    constructor(router) {
        this.router = router;
    }

    registerRoutes() {
        passport.use('login', new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            }
        , (email, pass, done) => this.authenticate(email, pass, done)));

        this.router.post('/register', async (req, res) => {
           this.register(req, res)
        });

        this.router.post('/login', async (req, res, next) => {
            const authenticator = passport.authenticate('login', (error, user, info) => {
                this.issueToken(error, user, req, res, next);
            });

            authenticator(req, res, next);
        });
    }

    async register(req, res) {
        const user = new User(req.body);
        const errors = user.validateSync();
        if (errors) {
            return res.status(400).json(errors);
        }

        try {
            const result = await user.save();
            return res.status(200).json(result);
        } catch(saveError) {
            return res.status(500).json(saveError);
        }
    }

    async authenticate(email, pass, done) {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null, false, {message: 'Invalid email'});
            }

            const isPassValid = user.comparePasswords(pass);
            if (!isPassValid) {
                return done(null, false, {message: 'Invalid password'});
            }

            done(null, user, {message: 'Login successfull'})
        } catch(e) {
            done(e)
        }
    }

    async issueToken(err, user, req, res, next) {
        if (err || !user) {
            next(new Error(err ?  err:  'No user'));
        }

        req.login(
            user,
            {session: false},
            async (error) => {
                if (error) {
                    return next(error);
                }

                const payload = {_id: user._id, email: user.email, name: user.name};
                const token = jwt.sign({user: payload}, process.env.JWT_SECRET);

                res.status(200).json({token})// => {token: token} es6
            }
        )
    }
}

module.exports = AuthRoutes;