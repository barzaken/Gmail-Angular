import { Action } from '@ngrx/store';
import { Email } from 'src/app/models/email';

export const SET_LOADING = '[email] loading';
export const SET_ERROR = '[email] error';
export const LOAD_ITEMS = '[email]s load';
export const SET_FILTER = '[email] filterBy';
export const LOAD_ITEM = '[email] load';
export const LOADED_ITEM = '[email] loaded';
export const LOADED_ITEMS = '[email]s loaded';
export const REMOVE_ITEM = '[email] remove';
export const REMOVED_ITEM = '[email] removed';
export const SAVE_ITEM = '[email] saved';
export const ADDED_ITEM = '[email] added';
export const UPDATED_ITEM = '[email] updated';

export type EmailAction = LoadEmails | LoadEmail | RemoveEmail | SaveEmail | SetFilter

export class LoadEmails implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public filterBy: string = '') {}
}
export class SetFilter implements Action {
  readonly type = SET_FILTER;
  constructor(public filterBy: object = {}) {}
}
export class LoadEmail implements Action {
  readonly type = LOAD_ITEM;
  constructor(public emailId: string = '') {}
}
export class RemoveEmail implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public emailId: string) {}
}
export class LoadedEmails implements Action {
  readonly type = LOADED_ITEMS;
  constructor(public emails: Email[] = []) {}
}
export class LoadedEmail implements Action {
  readonly type = LOADED_ITEM;
  constructor(public email: Email) {}
}
export class RemovedEmail implements Action {
  readonly type = REMOVED_ITEM;
  constructor(public emailId: string) {}
}
export class SaveEmail implements Action {
  readonly type = SAVE_ITEM;
  constructor(public email: Email) {}
}
export class AddedEmail implements Action {
  readonly type = ADDED_ITEM;
  constructor(public email: Email) {}
}
export class UpdatedEmail implements Action {
  readonly type = UPDATED_ITEM;
  constructor(public email: Email) {}
}
export class LoadingEmails implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class EmailError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) {}
}

