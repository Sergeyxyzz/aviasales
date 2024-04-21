import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { sortTicketsByPrice, sortTicketsByTime } from '../../store/appSlice'

const ButtonsMenu = (props) => {
  const dispatch = useDispatch()
  const [activeButton, setActiveButton] = useState('price')
  const ticketsReady = useSelector((state) => state.app.ticketsReady)

  const handleSortTicketsByPrice = () => {
    setActiveButton('price')
    dispatch(sortTicketsByPrice())
  }

  const handleSortTicketsByTime = () => {
    setActiveButton('time')
    dispatch(sortTicketsByTime())
  }

  return (
    <div className={styles.buttonsMenu}>
      <button
        type="button"
        className={activeButton === 'price' ? styles.active : ''}
        onClick={handleSortTicketsByPrice}
        disabled={!ticketsReady}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={activeButton === 'time' ? styles.active : ''}
        onClick={handleSortTicketsByTime}
        disabled={!ticketsReady}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  )
}

export default ButtonsMenu
