const authorized = (req, res, next) => {
    const { role } = req.userLogged;
    if (role === 'Project Manager') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden! you dont have permission to access this resource' });
    }
}

module.exports = authorized;