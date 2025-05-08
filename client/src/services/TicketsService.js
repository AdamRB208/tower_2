import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TicketProfile, Tickets } from "@/models/Tickets.js"
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
    AppState.ticketProfile = []
    const response = await api.get('account/tickets')
    logger.log('Got My Tickets!', response.data)
    const ticketProfile = response.data.map(pojo => new Tickets(pojo))
    AppState.ticketProfile = ticketProfile
    logger.log('rendering my tickets')
  }

}

export const ticketService = new TicketsService()