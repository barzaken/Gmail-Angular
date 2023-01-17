import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EmailService } from '../services/email.service';
import { EmailAction, SAVE_ITEM, ADDED_ITEM, UPDATED_ITEM, LOAD_ITEMS, LOADED_ITEMS, REMOVE_ITEM, REMOVED_ITEM, LOAD_ITEM, LOADED_ITEM, SET_ERROR } from './actions/email.actions';

// TODO: Add EmailFilter

// Nice way to test error handling? localStorage.clear() after emails are presented 
@Injectable()
export class AppEffects {

  loadEmails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_ITEMS),
      tap(() => console.log('Effects: load emails ==> service')),
      switchMap((action) =>
        this.emailService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got emails from service, send it to ===> Reducer')),
          map((emails) => ({
            type: LOADED_ITEMS,
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
      ofType(LOAD_ITEM),
      tap(() => console.log('Effects: load email ==> service')),
      switchMap((action) =>
        this.emailService.getById(action.emailId).pipe(
          tap(() => console.log('Effects: Got email from service ===> Reducer')),
          map((email) => ({
            type: LOADED_ITEM,
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
      ofType(REMOVE_ITEM),
      switchMap((action) =>
        this.emailService.remove(action.emailId).pipe(
          tap(() => console.log('Effects: Email removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_ITEM,
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
      ofType(SAVE_ITEM),
      switchMap((action) =>
        this.emailService.save(action.email).pipe(
          tap(() => console.log('Effects: Email saved by service, inform the ===> Reducer')),
          map((savedEmail) => ({
            type: (action.email._id) ? UPDATED_ITEM : ADDED_ITEM,
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
