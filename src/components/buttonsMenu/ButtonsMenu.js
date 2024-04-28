import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { sortTicketsByPrice, sortTicketsByTime } from '../../store/fetchNSortSlice'

const ButtonsMenu = () => {
  const dispatch = useDispatch()
  const [activeButton, setActiveButton] = useState('price')
  const ticketsReady = useSelector((state) => state.fetch.ticketsReady)

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
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={activeButton === 'time' ? styles.active : styles.disabled}
        onClick={handleSortTicketsByTime}
        disabled={!ticketsReady}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  )
}

export default ButtonsMenu
