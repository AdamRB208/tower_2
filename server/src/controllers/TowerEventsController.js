import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js"
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:towerEventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)

  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getTowerEventById(request, response, next) {
    try {
      const towerEventId = request.params.towerEventId
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
      response.send(towerEvent)
    }
    catch (error) {
      next(error);
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAllTowerEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents()
      response.send(towerEvents)
    }
    catch (error) {
      next(error);
    }
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
      const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
      response.send(towerEvent)
    }
    catch (error) {
      next(error);
    }
  }
}