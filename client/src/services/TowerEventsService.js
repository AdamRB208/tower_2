import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getTowerEvents() {
    const response = await api.get('api/events')
    logger.log('Got Tower Events!', response.data)
  }


}

export const towerEventsService = new TowerEventsService()