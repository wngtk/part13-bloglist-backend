import Blog from "./blog.js";
import ReadingList from "./reading_list.js";
// import Note from "./note.js";
import User from "./user.js";

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'marked_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_marked' })

// Note.sync()
// User.sync({ alter: true })
// Blog.sync({ alter: true })

export {
  // Note,
  Blog,
  User,
  ReadingList
}
