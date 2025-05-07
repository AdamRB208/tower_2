import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Tickets } from "@/models/Tickets.js"
import { AppState } from "@/AppState.js"

class TicketsService {

  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Created Ticket!', response.data)
    const ticket = new Tickets(response.data)
    AppState.ticket.push(ticket)
  }

}

export const ticketService = new TicketsService()