// TODO: Add Price

export interface Item {
  // id: string;
  // txt: string;
  _id: string,
  subject: string,
  body: string,
  isRead: boolean,
  isStar: boolean,
  isDraft: boolean,
  removedAt?: number | null,
  sentAt: number,
  from: string,
  to: string
}
