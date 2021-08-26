module.exports = (passport) => {
    return (req, res, next) => {

        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "All fields required" });
        }

        console.log(req.body.username)

        return passport.authenticate('local', (err, user, info) => {

            if (err) {
                return res.status(404).json({ error: err.message });
            }

            if (!user) {
                return res.status(401).json(info);
            }

            let token;
            token = user.generateJwt(user);
            return res.json({ access_token: token });

        })(req, res, next);

    }
}