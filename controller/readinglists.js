import { Router } from "express";
import { ReadingList } from "../models/index.js";

const readingListsRouter = Router()

readingListsRouter.post('/', async (req, res) => {
  try {
    const obj = {
      blogId: Number(req.body.blogId),
      userId: Number(req.body.userId)
    }
    console.log(obj)
    const readinglist = await ReadingList.create(obj)
    res.json(readinglist)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default readingListsRouter
