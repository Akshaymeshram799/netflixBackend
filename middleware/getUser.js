const jwt = require('jsonwebtoken');

const jwtSecretString = 'netflixclonewebapplication';

const fetchUser = async (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(400).send({ message: "authenticate first to access page" })
    }
    try {
        const data = jwt.verify(token, jwtSecretString)
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({message:"authenticate first to access page"});
    }
}

module.exports = { fetchUser }