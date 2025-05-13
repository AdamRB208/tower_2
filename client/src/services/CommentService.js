import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    logger.log('Created Comment', response.data)
  }

}

export const commentService = new CommentService()