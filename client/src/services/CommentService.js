import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comments } from "@/models/Comments.js"
import { AppState } from "@/AppState.js"


class CommentService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('Created Comment', response.data)
    const comment = new Comments(response.data)
    AppState.comments.push(comment)
    return comment
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    logger.log('deleting comment')
    const comment = AppState.comments
    const index = comment.findIndex(comment => comment.id == commentId)
    comment.splice(index, 1)
    logger.log('deleted comment', commentId)
  }

}

export const commentService = new CommentService()