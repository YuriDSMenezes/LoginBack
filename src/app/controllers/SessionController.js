const User = require('../models/User')
const jwt = require('jsonwebtoken')

const { expires, secret } = require('../../config/auth')

class SessionController {
  async create(request, response) {
    const { name, password } = request.body

    const user = await User.findOne({ where: { name } })

    if (!user) {
      return response.status(401).json({ error: 'User not found' })
    }

    const { id } = user

    return response.json({
      user: {
        id,
        name,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn: expires
      })
    })
  }
}

module.exports = new SessionController()