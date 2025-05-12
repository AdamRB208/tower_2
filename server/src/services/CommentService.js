import { dbContext } from "../db/DbContext.js"

class CommentService {

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }


}

export const commentService = new CommentService()