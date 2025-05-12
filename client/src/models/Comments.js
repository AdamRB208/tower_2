import { Account } from "./Account.js"

export class Comments {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.body = data.body
  }
}

export class CommentCreator extends Comments {
  constructor(data) {
    super(data)
    this.creator = new Account(data.creator)
  }
}