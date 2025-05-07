import { dbContext } from "../db/DbContext.js"

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


}

export const ticketService = new TicketService()