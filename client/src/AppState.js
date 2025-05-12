import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  towerEvent: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  activeTowerEvent: null,
  /** @type {import('./models/Tickets.js').Tickets[]} user info from the database*/
  tickets: [],
  /** @type {import('./models/Tickets.js').TicketProfile[]} user info from the database*/
  ticketProfile: [],
  /** @type {import('./models/Tickets.js').TicketEvent[]} user info from the database*/
  ticketEvent: [],
  /** @type {import('./models/Comments.js').Comments[]} user info from the database*/
  comments: [],
  /** @type {import('./models/Comments.js').CommentCreator[]} user info from the database*/
  commentCreator: [],
})

