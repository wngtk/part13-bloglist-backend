import Blog from "./blog.js";
import Note from "./note.js";

Note.sync()
Blog.sync()

export {
  Note,
  Blog
}
