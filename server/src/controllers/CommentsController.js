import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async createComment(request, response, next) {
    try {
      const commentData = request.body
      const userInfo = request.userInfo
      commentData.creatorId = userInfo.id
      const comment = await commentService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async deleteComment(request, response, next) {
    try {
      const commentId = request.params.commentId
      const userInfo = request.userInfo
      const message = await commentService.deleteComment(commentId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}