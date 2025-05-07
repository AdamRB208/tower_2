import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { TowerEventsSchema } from '../models/TowerEvents.js';
import { TicketSchema } from '../models/Tickets.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventsSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);

}

export const dbContext = new DbContext()
