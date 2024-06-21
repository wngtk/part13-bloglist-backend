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

readingListsRouter.put('/:id', async (req, res) => {
  const readinglist = await ReadingList.findByPk(req.params.id)
  if (readinglist) {
    readinglist.read = req.body.read
    await readinglist.save()
    res.json(readinglist)
  } else {
    res.status(404).end()
  }
})

export default readingListsRouter
