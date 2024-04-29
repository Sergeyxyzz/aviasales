import { configureStore } from '@reduxjs/toolkit'

import fetchNSortReducer from './fetchNSortSlice'
import filterReducer from './filterSlice'

const store = configureStore({
  reducer: {
    fetch: fetchNSortReducer,
    filter: filterReducer,
  },
})

export default store
