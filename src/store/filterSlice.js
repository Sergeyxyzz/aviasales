import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',

  initialState: {
    checkedAll: true,
    checkedWithout: true,
    checkedOne: true,
    checkedTwo: true,
    checkedThree: true,
    visibleTickets: 5,
    filteredTickets: [],
    tickets: [],
  },

  reducers: {
    setTicketInFilterSlice(state, action) {
      state.tickets = [...action.payload]
    },

    switchCheckedAll(state) {
      state.checkedAll = !state.checkedAll
      if (state.checkedAll) {
        state.checkedWithout = true
        state.checkedOne = true
        state.checkedTwo = true
        state.checkedThree = true
      } else {
        state.checkedWithout = false
        state.checkedOne = false
        state.checkedTwo = false
        state.checkedThree = false
      }
    },

    switchCheckedWithout(state) {
      state.checkedWithout = !state.checkedWithout
      filterSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedOne(state) {
      state.checkedOne = !state.checkedOne
      filterSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedTwo(state) {
      state.checkedTwo = !state.checkedTwo
      filterSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedThree(state) {
      state.checkedThree = !state.checkedThree
      filterSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    DRY_IN_FILTERS(state) {
      if (state.checkedWithout && state.checkedOne && state.checkedTwo && state.checkedThree) {
        state.checkedAll = true
      } else {
        state.checkedAll = false
      }
    },

    updateFilteredTickets: (state) => {
      state.filteredTickets = state.tickets?.filter((ticket) => {
        if (state.checkedAll) {
          return true
        } else {
          const stopsThereLen = ticket.segments[0].stops.length
          const stopsFromLen = ticket.segments[1].stops.length
          return (
            (state.checkedWithout && (stopsThereLen === 0 || stopsFromLen === 0)) ||
            (state.checkedOne && (stopsThereLen === 1 || stopsFromLen === 1)) ||
            (state.checkedTwo && (stopsThereLen === 2 || stopsFromLen === 2)) ||
            (state.checkedThree && (stopsThereLen === 3 || stopsFromLen === 3))
          )
        }
      })
    },
  },
})

export const {
  switchCheckedAll,
  switchCheckedWithout,
  switchCheckedOne,
  switchCheckedTwo,
  switchCheckedThree,
  updateFilteredTickets,
  setTicketInFilterSlice,
} = filterSlice.actions

export default filterSlice.reducer
