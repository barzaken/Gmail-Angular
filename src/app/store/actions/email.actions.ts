import { Action } from '@ngrx/store';
import { Email } from 'src/app/models/email';

export const SET_LOADING = '[email] loading';
export const SET_MODAL = '[email] modal';
export const SET_ERROR = '[email] error';
export const LOAD_EMAILS = '[email]s load';
export const SET_FILTER = '[email] filterBy';
export const LOAD_EMAIL = '[email] load';
export const LOADED_EMAIL = '[email] loaded';
export const LOADED_EMAILS = '[email]s loaded';
export const REMOVE_EMAIL = '[email] remove';
export const REMOVED_EMAIL = '[email] removed';
export const SAVE_EMAIL = '[email] saved';
export const ADDED_EMAIL = '[email] added';
export const UPDATED_EMAIL = '[email] updated';
export const SET_MSG = '[msg] updated';

export type EmailAction = LoadEmails | LoadEmail | RemoveEmail | SaveEmail | SetFilter | SetModal | SetMsg

export class LoadEmails implements Action {
  readonly type = LOAD_EMAILS;
  constructor(public filterBy: string = '') {}
}
export class SetFilter implements Action {
  readonly type = SET_FILTER;
  constructor(public filterBy: object = {}) {}
}
export class SetModal implements Action {
  readonly type = SET_MODAL;
  constructor(public mode: boolean = false) {}
}
export class SetMsg implements Action {
  readonly type = SET_MSG;
  constructor(public msg: string = '') {}
}
export class LoadEmail implements Action {
  readonly type = LOAD_EMAIL;
  constructor(public emailId: string = '') {}
}
export class RemoveEmail implements Action {
  readonly type = REMOVE_EMAIL;
  constructor(public emailId: string) {}
}
export class LoadedEmails implements Action {
  readonly type = LOADED_EMAILS;
  constructor(public emails: Email[] = []) {}
}
export class LoadedEmail implements Action {
  readonly type = LOADED_EMAIL;
  constructor(public email: Email) {}
}
export class RemovedEmail implements Action {
  readonly type = REMOVED_EMAIL;
  constructor(public emailId: string) {}
}
export class SaveEmail implements Action {
  readonly type = SAVE_EMAIL;
  constructor(public email: Email) {}
}
export class AddedEmail implements Action {
  readonly type = ADDED_EMAIL;
  constructor(public email: Email) {}
}
export class UpdatedEmail implements Action {
  readonly type = UPDATED_EMAIL;
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

