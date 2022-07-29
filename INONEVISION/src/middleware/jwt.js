const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const token = (req, res, next) => {
    const token = req.header('token')
    console.log(`Verifico el token: ${token}`)
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}


// middleware to validate token (rutas protegidas)
const permissions = (req, res, next) => {

    console.log(req, res, "aqui ando");

    try {
        console.log(`verifico los permisos`)
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

const authJwt = {
    token,
    permissions
  };

module.exports = authJwt;