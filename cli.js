import { DataTypes, Model, Sequelize } from "sequelize";
import 'dotenv/config'

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
    await sequelize.close()
  })
