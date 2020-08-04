const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const {secret} = require('../../config/auth')

module.exports = async  (request,response,next) => {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).json({error:'Token not provided'})
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token,secret);

    require.userId = decoded.id
  }catch(error) {
    return response.status(401).json({error:'Token invalid'})
  }

  return next()
}