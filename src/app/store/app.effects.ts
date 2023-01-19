import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap,concatMap } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import { EmailAction, SAVE_EMAIL, ADDED_EMAIL, UPDATED_EMAIL, LOAD_EMAILS, LOADED_EMAILS, REMOVE_EMAIL, REMOVED_EMAIL, LOAD_EMAIL, LOADED_EMAIL, SET_ERROR } from './actions/email.actions';

// TODO: Add EmailFilter

// Nice way to test error handling? localStorage.clear() after emails are presented 
@Injectable()
export class AppEffects {

  loadEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMAILS),
      tap(() => console.log('Effects: load emails ==> service')),
      switchMap((action) =>
        this.emailService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got emails from service, send it to ===> Reducer')),
          map((emails) => ({
            type: LOADED_EMAILS,
            emails,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMAIL),
      tap(() => console.log('Effects: load email ==> service')),
      switchMap((action) =>
        this.emailService.getById(action.emailId).pipe(
          tap(() => console.log('Effects: Got email from service ===> Reducer')),
          map((email) => ({
            type: LOADED_EMAIL,
            email
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  removeEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_EMAIL),
      concatMap((action) =>
        this.emailService.remove(action.emailId).pipe(
          tap(() => console.log('Effects: Email removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_EMAIL,
            emailId: action.emailId,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  })
  saveEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SAVE_EMAIL),
      concatMap((action) =>
        this.emailService.save(action.email).pipe(
          tap(() => console.log('Effects: Email saved by service, inform the ===> Reducer')),
          map((savedEmail) => ({
            type: (action.email._id) ? UPDATED_EMAIL : ADDED_EMAIL,
            email: savedEmail,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  })
  constructor(
    private actions$: Actions<EmailAction>,
    private emailService: EmailService
  ) { }
}
