import { dbContext } from "../db/DbContext.js"

class CommentService {

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    return comments
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }


}

export const commentService = new CommentService()