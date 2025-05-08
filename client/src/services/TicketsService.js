import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Tickets, TicketEvent } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketsService {

  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Created Ticket!', response.data)
    const ticket = new Tickets(response.data)
    AppState.tickets.push(ticket)
    AppState.activeTowerEvent.ticketCount++
  }

  async getMyTickets() {
    AppState.ticketEvent = []
    const response = await api.get('account/tickets')
    logger.log('Got My Tickets!', response.data)
    // NOTE response data cannot be put in virtual TicketProfile must be put in Ticket.
    const ticketEvent = response.data.map(pojo => new TicketEvent(pojo))
    AppState.ticketEvent = ticketEvent
    logger.log('rendering my tickets', ticketEvent)
  }

}

export const ticketService = new TicketsService()