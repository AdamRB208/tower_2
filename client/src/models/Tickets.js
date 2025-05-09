import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Tickets {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}

export class TicketProfile extends Tickets {
  constructor(data) {
    super(data)
    this.profile = new Account(data.profile)
  }
}

export class TicketEvent extends Tickets {
  constructor(data) {
    super(data)
    this.event = new TowerEvent(data.event)
  }
}

