import { Router } from "express";
import { tokenExtractor } from "../utils/middleware";
import { ActiveToken } from "../models";

const logoutRouter = Router()

logoutRouter.delete('/', tokenExtractor, async (req, res) => {
  await ActiveToken.findOne({
    where: {
      token: req.decodedToken
    }
  })
  res.status(201).end()
})

export default logoutRouter
