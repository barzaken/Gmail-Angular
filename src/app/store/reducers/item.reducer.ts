import { SET_LOADING, LOADED_ITEMS, REMOVED_ITEM, ADDED_ITEM, UPDATED_ITEM, LOADED_ITEM, SET_ERROR,SET_FILTER } from '../actions/item.actions';
import { Item } from 'src/app/models/item';
import { createSelector } from '@ngrx/store';
import { filter } from 'rxjs';

export interface ItemState {
  items: Item[];
  item: Item | null;
  isLoading: boolean;
  error: string;
  filterBy: object;

}

const initialState: ItemState = {
  items: [],
  item: null,
  isLoading: false,
  error: '',
  filterBy:{txt:'',category:''}
};

export function reducer(state: ItemState = initialState, action: any): ItemState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting item error`, error);
      return { ...state, error, isLoading: false };
    }
    case SET_FILTER: {
      const { filterBy } = action;
      console.log(`Reducer: Setting filter`, filterBy);
      return { ...state, filterBy, isLoading: false };
    }
    case LOADED_ITEMS: {
      const { items } = action;
      console.log(`Reducer: Setting loaded items (${items.length}) items`);
      return { ...state, items, isLoading: false, error: '' };
    }
    case LOADED_ITEM: {
      const { item } = action;
      console.log(`Reducer: Setting loaded item ${item._id}`);
      return { ...state, item, error: '' };
    }
    case REMOVED_ITEM: {
      const { itemId } = action;
      console.log('Reducer: Removing item:', itemId);
      const items = state.items.filter(item => item._id !== itemId)
      return { ...state, items, error: '' };

    }
    case ADDED_ITEM: {
      const { item } = action;
      console.log('Reducer: Adding item:', item);
      const items = [...state.items, item]
      return { ...state, items, error: '' };
    }
    case UPDATED_ITEM: {
      const { item } = action;
      console.log('Reducer: Updating item:', item);
      const items = state.items.map(currItem => (currItem._id === item._id) ? item : currItem)
      return { ...state, items, item: null, error: '' };
    }
    default:
      return state;
  }
}

export const filterBy = (state: ItemState) => state.filterBy;
export const allItems = (state: ItemState) => state.items;

export const itemsToShow = createSelector(
  filterBy,
  allItems,
  (filterBy: any, allItems: Item[]) => {
    if (filterBy && allItems) {
      const regex = new RegExp(filterBy.txt,'i');
      return allItems.filter((item: Item) => regex.test(item.subject));
    } else {
      return allItems;
    }
  }
);