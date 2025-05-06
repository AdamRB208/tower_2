import { dbContext } from "../db/DbContext.js"

class TowerEventsService {

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService()