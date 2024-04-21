import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import InfoTransplants from '../infoTransplants/InfoTransplants'
import ButtonsMenu from '../buttonsMenu/ButtonsMenu'
import Ticket from '../ticket/Ticket'
import BtnShowMoreTickets from '../BtnShowMoreTickets/BtnShowMoreTickets'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, notification, Alert } from 'antd'
import { fetchSearchId, fetchTickets, updateFilteredTickets, sortTicketsByPrice } from '../../store/appSlice'

const App = (props) => {
  const dispatch = useDispatch()
  const filteredTickets = useSelector((state) => state.app.filteredTickets)
  const searchId = useSelector((state) => state.app.searchId)
  const state = useSelector((state) => state.app)
  const isLoading = useSelector((state) => state.app.isLoading)
  const error = useSelector((state) => state.app.error)
  const visibleTickets = useSelector((state) => state.app.visibleTickets)
  const ticketsReady = useSelector((state) => state.app.ticketsReady)

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
    dispatch(fetchSearchId())
  }, [dispatch])

  useEffect(() => {
    if (searchId && typeof searchId === 'object') {
      const id = searchId.searchId
      dispatch(fetchTickets(id))
    }
  }, [dispatch, searchId])

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Ошибка',
        description: error,
      })
    }
  }, [error])

  useEffect(() => {
    if (ticketsReady) {
      setTimeout(() => {
        dispatch(sortTicketsByPrice())
      }, 666)
    }
  }, [ticketsReady, dispatch])

  return (
    <>
      <img src="./logo.png" alt="alt" className={styles.logo} />
      <div className={styles.container}>
        <InfoTransplants />
        <div className={styles.flexWrap}>
          <ButtonsMenu />
          <div>
            {isLoading ? (
              <Spin size="large" className={styles.spinner} />
            ) : filteredTickets?.length === 0 ? (
              <Alert
                message={'Рейсов, подходящих под заданные фильтры, не найдено'}
                style={{ marginTop: 20 }}
                showIcon
              />
            ) : (
              filteredTickets?.slice(0, visibleTickets)?.map((ticket) => <Ticket key={uuidv4()} {...ticket} />)
            )}
          </div>
          <div className={styles.wrapShowMore}>
            {filteredTickets?.length === 0 || !ticketsReady ? '' : <BtnShowMoreTickets />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
