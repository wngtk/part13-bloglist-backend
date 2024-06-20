import { Router } from "express";
import { User } from "../models/index.js";
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

  const userForToken = {
    username,
    id: user.id
  }
  const token = jwt.sign(userForToken, SECRET)
  res.json({ token, username: user.username, name: user.name })
})

export default loginRouter
