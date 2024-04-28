import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import InfoTransplants from '../infoTransplants/InfoTransplants'
import ButtonsMenu from '../buttonsMenu/ButtonsMenu'
import Ticket from '../ticket/Ticket'
import BtnShowMoreTickets from '../BtnShowMoreTickets/BtnShowMoreTickets'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, notification, Alert } from 'antd'
import { fetchSearchId, setVisible } from '../../store/fetchNSortSlice'
import { setTicketInFilterSlice, updateFilteredTickets } from '../../store/filterSlice'

const App = (props) => {
  const dispatch = useDispatch()
  const filteredTickets = useSelector((state) => state.filter.filteredTickets)
  const state = useSelector((state) => state.filter)
  const isLoading = useSelector((state) => state.fetch.isLoading)
  const error = useSelector((state) => state.fetch.error)
  const visibleTickets = useSelector((state) => state.fetch.visibleTickets)
  const tickets = useSelector((state) => state.fetch.tickets)

  let isSearchIdFetched = false

  useEffect(() => {
    dispatch(updateFilteredTickets(state))
  }, [
    dispatch,
    state.tickets,
    state.checkedAll,
    state.checkedWithout,
    state.checkedOne,
    state.checkedTwo,
    state.checkedThree,
  ])

  useEffect(() => {
    dispatch(setVisible())
  }, [
    state.checkedAll,
    state.checkedWithout,
    state.checkedOne,
    state.checkedTwo,
    state.checkedThree,
  ])

  useEffect(() => {
    dispatch(setTicketInFilterSlice(tickets))
  }, [tickets, dispatch])

  useEffect(() => {
    if (!isSearchIdFetched) {
      dispatch(fetchSearchId())
      isSearchIdFetched = true
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Ошибка!',
        description: error,
      })
    }
  }, [error])

  return (
    <>
      {isLoading ? (
        <Spin size="large" className={styles.logoSpinner} />
      ) : (
        <img src="./logo.png" alt="Logo" className={styles.logo} />
      )}
      <div className={styles.container}>
        <InfoTransplants />
        <div className={styles.flexWrap}>
          <ButtonsMenu />
          <div>
            {filteredTickets.length === 0 ? (
              <Alert
                message={'Рейсов, подходящих под заданные фильтры, не найдено'}
                style={{ marginTop: 20 }}
                showIcon
              />
            ) : (
              filteredTickets
                ?.slice(0, visibleTickets)
                ?.map((ticket) => <Ticket key={uuidv4()} {...ticket} />)
            )}
          </div>
          <div className={styles.wrapShowMore}>
            {state.checkedAll ||
            state.checkedWithout ||
            state.checkedOne ||
            state.checkedTwo ||
            state.checkedThree ? (
              <BtnShowMoreTickets />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
