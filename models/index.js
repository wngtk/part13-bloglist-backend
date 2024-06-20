import Blog from "./blog.js";
import Note from "./note.js";
import User from "./user.js";

User.hasMany(Blog)
Blog.belongsTo(User)

Note.sync()
User.sync({ alter: true })
Blog.sync({ alter: true })

export {
  Note,
  Blog,
  User
}
