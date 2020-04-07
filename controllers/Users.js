const { authSecret } = require('../.env')
const jwt = require('jsonwebtoken')
const sha1 = require('sha1')

module.exports = app => {

  const store = async (req, res) => {
    const { name, email, pass } = req.body

    if (!name || !email || !pass) 
      return res.status(400).json({ message: 'Dados para o usuário não encontrados' })
    
    let password = sha1(pass)
    
    await app.db('users')
    .insert({
      name, 
      email, 
      password, 
    })
    .then(() => res.status(200).json({ message: 'Cadastro realizado' }))
    .catch(() => res.status(500).json({ message: 'Erro ao cadastrar usuário' }))
  }

  const index = async (req, res) => {
    const { email, pass } = req.body

    if (!email || !pass) 
      return res.status(400).json({ message: 'Dados necessários não informados' })

    let password = sha1(pass)
    
    let user = await app.db('users')
    .select('*')
    .where({
      email,
      password
    })
    .first()
    
    if (!user) 
      return res.status(401).json({ message: 'Usuário ou senha invalidos' })

    const now = Math.floor(Date.now() / 1000)
    
    const payload = {
      ...user,  
      iat: now,
      exp: now + (60 * 60 * 24),
    }
    
    return res.status(200).json({
      token: jwt.sign(payload, authSecret)
    })
  }

  return {
    store,
    index
  }
}