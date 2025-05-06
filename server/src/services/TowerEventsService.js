import { dbContext } from "../db/DbContext.js"

class TowerEventsService {

  async getAllTowerEvents() {
    const towerEvent = await dbContext.TowerEvents.find().populate('creator', 'name picture')
    return towerEvent
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', 'name picture')
    return towerEvent
  }

  async createTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }

}

export const towerEventsService = new TowerEventsService()