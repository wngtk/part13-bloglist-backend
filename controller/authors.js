import { Router } from "express";
import { Blog } from "../models/index.js";
import { sequelize } from "../utils/db.js";

const authorsRouter = Router();

authorsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [
      ['likes', 'DESC']
    ]
  });
  res.json(blogs)
});

export default authorsRouter;
