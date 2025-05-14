import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"
import { Comments } from "@/models/Comments.js"

class TowerEventsService {

  async getTowerEvents() {
    const response = await api.get('api/events')
    logger.log('Got Tower Events!', response.data)
    const towerEvent = response.data.map(pojo => new TowerEvent(pojo))
    AppState.towerEvent = towerEvent
    logger.log('Rendering Tower Events!')
  }

  async createTowerEvent(towerEventData) {
    const response = await api.post('api/events', towerEventData)
    logger.log('Created Tower Event!', response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.towerEvent.unshift(towerEvent)
    return towerEvent
  }

  async getTowerEventById(towerEventId) {
    const response = await api.get(`api/events/${towerEventId}`)
    logger.log('Got Tower Event By ID', response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = towerEvent
  }

  async cancelTowerEvent(towerEventId) {
    const response = await api.delete(`api/events/${towerEventId}`)
    logger.log('Deleted Tower Event', response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = towerEvent
  }

  async getCommentsByEventId(towerEventId) {
    const response = await api.get(`api/events/${towerEventId}/comments`)
    logger.log('Got comments by Event Id', response.data)
    const comments = response.data.map(pojo => new Comments(pojo))
    AppState.comments = comments
    logger.log('rendering comments by event Id', comments)
  }

}

export const towerEventsService = new TowerEventsService()