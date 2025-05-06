import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService {

  async getTowerEvents() {
    const response = await api.get('api/events')
    logger.log('Got Tower Events!', response.data)
    const towerEvent = response.data.map(pojo => new TowerEvent(pojo))
    AppState.towerEvent = towerEvent
    logger.log('Rendering Tower Event pojos!')
  }

  async getTowerEventById(towerEventId) {
    const response = await api.get(`api/events/${towerEventId}`)
    logger.log('Got Tower Event By ID', response.data)
    const towerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = towerEvent

  }

}

export const towerEventsService = new TowerEventsService()