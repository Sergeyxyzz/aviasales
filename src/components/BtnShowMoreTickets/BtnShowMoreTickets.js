import React from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { showMoreTickets } from '../../store/fetchNSortSlice'

const BtnShowMoreTickets = () => {
  const dispatch = useDispatch()

  return (
    <button className={styles.btnShowMoreTickets} onClick={() => dispatch(showMoreTickets())}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
    </button>
  )
}

export default BtnShowMoreTickets
