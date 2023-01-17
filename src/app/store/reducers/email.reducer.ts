import { SET_LOADING, LOADED_EMAILS, REMOVED_EMAIL, ADDED_EMAIL, UPDATED_EMAIL, LOADED_EMAIL, SET_ERROR,SET_FILTER,SET_MODAL } from '../actions/email.actions';
import { Email } from 'src/app/models/email';
import { createSelector } from '@ngrx/store';

export interface EmailState {
  emails: Email[];
  email: Email | null;
  isLoading: boolean;
  isAdding: boolean;
  error: string;
  filterBy: object;
}

const initialState: EmailState = {
  emails: [],
  email: null,
  isLoading: false,
  isAdding: false,
  error: '',
  filterBy:{txt:'',category:''}
};

export function reducer(state: EmailState = initialState, action: any): EmailState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting email error`, error);
      return { ...state, error, isLoading: false };
    }
    case SET_MODAL: {
      const { mode } = action;
      // console.log(`Reducer: Setting email error`, error);
      return { ...state, isAdding: mode};
    }
    case SET_FILTER: {
      const { filterBy } = action;
      console.log(`Reducer: Setting filter`, filterBy);
      return { ...state, filterBy, isLoading: false };
    }
    case LOADED_EMAILS: {
      const { emails } = action;
      console.log(`Reducer: Setting loaded emails (${emails.length}) emails`);
      return { ...state, emails, isLoading: false, error: '' };
    }
    case LOADED_EMAIL: {
      const { email } = action;
      console.log(`Reducer: Setting loaded email ${email._id}`);
      return { ...state, email, error: '' };
    }
    case REMOVED_EMAIL: {
      const { emailId } = action;
      console.log('Reducer: Removing email:', emailId);
      const emails = state.emails.filter(email => email._id !== emailId)
      return { ...state, emails, error: '' };

    }
    case ADDED_EMAIL: {
      const { email } = action;
      console.log('Reducer: Adding email:', email);
      const emails = [...state.emails, email]
      return { ...state, emails, error: '' };
    }
    case UPDATED_EMAIL: {
      const { email } = action;
      console.log('Reducer: Updating email:', email);
      const emails = state.emails.map(currEmail => (currEmail._id === email._id) ? email : currEmail)
      // return { ...state, emails, email: null, error: '' };
      return { ...state, emails, error: '' };
    }
    default:
      return state;
  }
}

export const filterBy = (state: EmailState) => state.filterBy;
export const allEmails = (state: EmailState) => state.emails;

export const emailsToShow = createSelector(
  filterBy,
  allEmails,
  (filterBy: any, allEmails: Email[]) => {
    if (filterBy && allEmails) {
      const regex = new RegExp(filterBy.txt,'i');
      return allEmails.filter((email: Email) => regex.test(email.subject));
    } else {
      return allEmails;
    }
  }
);