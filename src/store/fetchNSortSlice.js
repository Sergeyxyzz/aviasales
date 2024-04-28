import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('fetch/fetchSearchId', async (_, { dispatch }) => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return dispatch(fetchTickets(data.searchId))
})

const fetchTickets = createAsyncThunk('fetch/fetchTickets', async (searchId, { dispatch }) => {
  let errorCounterFilms = 0
  let errorCounterInternet = 0

  while (true) {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      )
      if (response.ok) {
        const data = await response.json()
        dispatch(addTickets(data.tickets))
        dispatch(sortTicketsByPrice())
        if (data.stop) {
          break
        }
      } else {
        errorCounterFilms += 1
        if (errorCounterFilms === 5) {
          const errorMsg = `Ошибка загрузки билетов с сервера: перезагрузите страницу или проверьте подключение к интернету.`
          dispatch(fetchSlice.actions.setError(errorMsg))
          break
        }
      }
    } catch (error) {
      errorCounterInternet += 1
      if (errorCounterInternet === 3) {
        const errorMsg = `Пропало соединение с интернетом: проверьте подключение к интернету и перезагрузите страницу.`
        dispatch(fetchSlice.actions.setError(errorMsg))
        break
      }
    }
  }
})

const fetchSlice = createSlice({
  name: 'fetch',

  initialState: {
    tickets: [],
    status: null,
    error: null,
    isLoading: false,
    ticketsReady: false,
  },

  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },

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

    setVisible: (state) => {
      state.visibleTickets = 5
    },

    showMoreTickets(state) {
      state.visibleTickets += 5
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSearchId.fulfilled, (state) => {
        state.status = 'resolved'
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.status = 'rejected'
        state.error =
          'Ошибка при загрузке идентификатора: перезагрузите страницу или проверьте подключение к интернету'
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
      })
  },
})

export const { sortTicketsByPrice, sortTicketsByTime, showMoreTickets, addTickets, setVisible } =
  fetchSlice.actions

export default fetchSlice.reducer
