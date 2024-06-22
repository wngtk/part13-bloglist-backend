import { Router } from "express";
import { ActiveToken, User } from "../models/index.js";
import { SECRET } from "../utils/config.js";
import jwt from "jsonwebtoken";

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } =  req.body
  const user = await User.findOne({
    where: {
      username
    }
  })

  const passwordCorrect = password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    await ActiveToken.destroy({
      where: {
        userId: user.id
      }
    })
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username,
    id: user.id
  }
  const token = jwt.sign(userForToken, SECRET)
  await ActiveToken.create({ token: token, userId: user.id })
  res.json({ token, username: user.username, name: user.name })
})

export default loginRouter
