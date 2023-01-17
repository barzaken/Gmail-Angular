export interface Email {
  _id: string,
  subject: string,
  body: string,
  isRead: boolean,
  isStar: boolean,
  isDraft: boolean,
  removedAt: number | null,
  sentAt: number,
  from: string,
  to: string
}
