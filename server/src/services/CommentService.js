import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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


  async deleteComment(commentId, userInfo) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment == null) {
      throw new BadRequest(`Invalid Id: ${commentId}`)
    }
    if (comment.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE SOMEONE ELSES COMMENT ${userInfo.nickname.toUpperCase()}!`)
    }
    await comment.deleteOne()
    return 'Deleted Comment!'
  }
}

export const commentService = new CommentService()