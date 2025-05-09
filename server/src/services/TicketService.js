import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketService {

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }

  async getTicketsByAccountId(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({
      path: 'event',
      populate: {
        path: 'creator ticketCount',
        select: 'name picture'
      }
    })
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile')
    return tickets
  }

  async deleteTicket(ticketId, userInfo) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (ticket == null) {
      throw new BadRequest(`Invalid Id: ${ticketId}`)
    }
    if (ticket.accountId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE ANOTHER USERS TICKET ${userInfo.nickname.toUpperCase()}!`)
    }
    await ticket.deleteOne()
    return 'You are no longer attending this event!'
  }

}

export const ticketService = new TicketService()