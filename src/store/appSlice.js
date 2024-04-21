import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('app/fetchSearchId', async function () {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data
})

export const fetchTickets = createAsyncThunk('app/fetchTickets', async function (searchId) {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  const data = await response.json()
  return data
})

const appSlice = createSlice({
  name: 'app',

  initialState: {
    tickets: [],
    status: null,
    error: null,
    isLoading: false,
    searchId: null,
    ticketsReady: false,
    visibleTickets: 5,
    checkedAll: true,
    checkedWithout: true,
    checkedOne: true,
    checkedTwo: true,
    checkedThree: true,
    filteredTickets: [],
  },

  reducers: {
    sortTicketsByPrice(state) {
      state.tickets = {
        ...state.tickets,
        tickets: state.tickets.tickets?.sort((a, b) => a.price - b.price),
      }
    },

    sortTicketsByTime(state) {
      state.tickets = {
        ...state.tickets,
        tickets: state.tickets.tickets
          ?.map((elem) => {
            const durationSum = elem.segments[0].duration + elem.segments[1].duration
            return {
              ...elem,
              durationSum: durationSum,
            }
          })
          ?.sort((a, b) => a.durationSum - b.durationSum),
      }
    },

    showMoreTickets(state) {
      state.visibleTickets += 5
    },

    switchCheckedAll(state) {
      state.checkedAll = !state.checkedAll
      if (state.checkedAll) {
        state.checkedWithout = true
        state.checkedOne = true
        state.checkedTwo = true
        state.checkedThree = true
        state.visibleTickets = 5
      } else {
        state.checkedWithout = false
        state.checkedOne = false
        state.checkedTwo = false
        state.checkedThree = false
        state.visibleTickets = 5
      }
    },

    switchCheckedWithout(state) {
      state.checkedWithout = !state.checkedWithout
      appSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedOne(state) {
      state.checkedOne = !state.checkedOne
      appSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedTwo(state) {
      state.checkedTwo = !state.checkedTwo
      appSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    switchCheckedThree(state) {
      state.checkedThree = !state.checkedThree
      appSlice.caseReducers.DRY_IN_FILTERS(state)
      state.visibleTickets = 5
    },

    DRY_IN_FILTERS(state) {
      if (state.checkedWithout && state.checkedOne && state.checkedTwo && state.checkedThree) {
        state.checkedAll = true
      } else {
        state.checkedAll = false
      }
    },

    updateFilteredTickets(state) {
      state.filteredTickets = state.tickets.tickets?.filter((ticket) => {
        if (state.checkedAll) {
          return true
        } else {
          const stopsLength = ticket.segments[0].stops.length
          return (
            (state.checkedWithout && stopsLength === 0) ||
            (state.checkedOne && stopsLength === 1) ||
            (state.checkedTwo && stopsLength === 2) ||
            (state.checkedThree && stopsLength === 3)
          )
        }
      })
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.searchId = action.payload
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.status = 'rejected'
        state.error = 'Ошибка при загрузке идентификатора: перезагрузите страницу или проверьте подключение к интернету'
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'resolved'
        state.tickets = action.payload
        state.ticketsReady = true
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.isLoading = false
        state.status = 'rejected'
        state.error = 'Ошибка при загрузке билетов: перезагрузите страницу или проверьте подключение к интернету'
      })
  },
})

export const {
  sortTicketsByPrice,
  sortTicketsByTime,
  showMoreTickets,
  switchCheckedAll,
  switchCheckedWithout,
  switchCheckedOne,
  switchCheckedTwo,
  switchCheckedThree,
  updateFilteredTickets,
} = appSlice.actions

export default appSlice.reducer
