import { configureStore, combineReducers } from '@reduxjs/toolkit'

import fetchNSortReducer from './fetchNSortSlice'
import filterReducer from './filterSlice'

const rootReducer = combineReducers({
  fetch: fetchNSortReducer,
  filter: filterReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
