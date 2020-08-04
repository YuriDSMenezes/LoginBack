const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const AuthMiddleware = require('./app/middlewares/auth')

const routes = new Router()

routes.post('/users',UserController.create)
routes.post('/sessions',SessionController.create)

routes.use(AuthMiddleware)

routes.get('/users',UserController.index)


module.exports = routes