import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async createTicket(ticketData) {
    const response = await api.post('api/tickets', ticketData)
    logger.log('Created Ticket!', response.data)
  }

}

export const ticketService = new TicketsService()