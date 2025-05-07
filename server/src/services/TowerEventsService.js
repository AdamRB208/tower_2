import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async editTowerEvent(towerEventId, userInfo, updateData) {
    const towerEventToUpdate = await dbContext.TowerEvents.findById(towerEventId)
    if (towerEventToUpdate == null) {
      throw new BadRequest(`Invalid Tower Event ID: ${towerEventId}`)
    }
    towerEventToUpdate.name = updateData.name
    towerEventToUpdate.description = updateData.description

    await towerEventToUpdate.save()
    return towerEventToUpdate
    if (towerEventId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT EDIT ANOTHER USERS EVENT ${userInfo.nickname.toUpperCase()}!`)
    }
  }

  async archiveTowerEvent(towerEventId, userInfo) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    towerEvent.isCanceled = !towerEvent.isCanceled

    await towerEvent.save()
    if (towerEvent.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT CANCEL ANOTHER USERS EVENT ${userInfo.nickname.toUpperCase()}!`)
    }
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()