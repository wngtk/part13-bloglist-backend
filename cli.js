import { DataTypes, Model, Sequelize } from "sequelize";
import 'dotenv/config'
import express from "express"

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

sequelize
  .authenticate()
  .then(async () => {
    const blogs = await Blog.findAll()
    for (const blog of blogs) {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    }
    // await sequelize.close()
  })

const app = express()
app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const n = await Blog.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.json(n)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.listen(3005, () => {
  console.log('listen on 3005');
})
