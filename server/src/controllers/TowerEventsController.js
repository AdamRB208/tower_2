import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js"
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketService } from "../services/TicketService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:towerEventId', this.getTowerEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:towerEventId', this.editTowerEvent)
      .delete('/:towerEventId', this.archiveTowerEvent)

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

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async editTowerEvent(request, response, next) {
    try {
      const towerEventId = request.params.towerEventId
      const towerEventToUpdate = request.body
      const userInfo = request.userInfo
      const towerEvent = await towerEventsService.editTowerEvent(towerEventId, userInfo, towerEventToUpdate)
      response.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async archiveTowerEvent(request, response, next) {
    try {
      const towerEventId = request.params.towerEventId
      const userInfo = request.userInfo
      const message = await towerEventsService.archiveTowerEvent(towerEventId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  async getTicketsByEventId(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketService.getTicketsByEventId(eventId)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}