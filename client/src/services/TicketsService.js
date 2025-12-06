import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Tickets, TicketEvent, TicketProfile } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketsService {

  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Created Ticket!', response.data)
    const ticket = new TicketProfile(response.data)
    AppState.ticketProfile.push(ticket)
    AppState.activeTowerEvent.ticketCount++
  }

  async getMyTickets() {
    AppState.ticketEvent = []
    const response = await api.get('account/tickets')
    logger.log('Got My Tickets!', response.data)
    const ticketEvent = response.data.map(pojo => new TicketEvent(pojo))
    AppState.ticketEvent = ticketEvent
    logger.log('rendering my tickets', ticketEvent)
  }

  async getTicketByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log('Got Tickets by Event Id', response.data)
    const ticketProfile = response.data.map(pojo => new TicketProfile(pojo))
    AppState.ticketProfile = ticketProfile
    logger.log('rendering event tickets', ticketProfile)
  }

  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log('Deleted Ticket!', response.data)
    const ticketEvent = AppState.ticketEvent
    const index = ticketEvent.findIndex(ticket => ticket.id == ticketId)
    ticketEvent.splice(index, 1)
  }

}

export const ticketService = new TicketsService()