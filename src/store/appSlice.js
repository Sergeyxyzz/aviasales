import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('app/fetchSearchId', async (_, { dispatch }) => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return dispatch(fetchTickets(data.searchId))
})

const fetchTickets = createAsyncThunk('app/fetchTickets', async (searchId, { dispatch }) => {
  while (true) {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      if (response.ok) {
        const data = await response.json()
        dispatch(addTickets(data.tickets))
        dispatch(sortTicketsByPrice())
        if (data.stop) {
          break
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки билетов', error)
    }
  }
})

const appSlice = createSlice({
  name: 'app',

  initialState: {
    tickets: [],
    status: null,
    error: null,
    isLoading: false,
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
    addTickets(state, action) {
      state.tickets.push(...action.payload)
    },

    sortTicketsByPrice(state) {
      state.tickets.sort((a, b) => a.price - b.price)
    },

    sortTicketsByTime(state) {
      state.tickets.forEach((ticket) => {
        ticket.durationSum = ticket.segments.reduce((sum, segment) => sum + segment.duration, 0)
      })
      state.tickets.sort((a, b) => a.durationSum - b.durationSum)
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.status = 'resolved'
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
      .addCase(fetchTickets.fulfilled, (state) => {
        state.isLoading = false
        state.status = 'resolved'
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
  addTickets,
} = appSlice.actions

export default appSlice.reducer
