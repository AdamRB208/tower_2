import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)

  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createTowerEvent(request, response, next) {
    try {
      const towerEventData = request.body
      const userInfo = request.userInfo
      towerEventData.creatorId = userInfo.id
      const towerEvent = await towerEventService.createTowerEvent(towerEventData)
    }
    catch (error) {
      next(error);
    }
  }
}