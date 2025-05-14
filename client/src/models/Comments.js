import { Account } from "./Account.js"

export class Comments {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.body = data.body
    this.creator = data.creator
  }
}

// export class CommentCreator extends Comments {
//   constructor(data) {
//     super(data)
//     this.creator = data.creator
//   }
// }