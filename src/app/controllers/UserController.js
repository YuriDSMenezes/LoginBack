const User = require('../models/User')
const Yup =require('yup')

class UserController {
  async create(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().min(6).required()
    })

    if(!(await schema.isValid(request.body))) {
      return response.status(400).json({error: 'Validation fails'})
    }

    const userExists = await User.findOne({ where: { name: request.body.name } })

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' })
    }
    const { id, name } = await User.create(request.body)

    return response.json({
      id,
      name
    })
  }
  
  async index(request, response) {
    const users  = await User.findAll();

    return response.json(users)
  }
}

module.exports = new UserController()