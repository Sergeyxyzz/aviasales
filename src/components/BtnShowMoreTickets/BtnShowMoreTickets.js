import React from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { showMoreTickets } from '../../store/appSlice'

const BtnShowMoreTickets = () => {
  const dispatch = useDispatch()
  const ticketsReady = useSelector((state) => state.app.ticketsReady)
  const all = useSelector((state) => state.app.checkedAll)
  const without = useSelector((state) => state.app.checkedWithout)
  const one = useSelector((state) => state.app.checkedOne)
  const two = useSelector((state) => state.app.checkedTwo)
  const three = useSelector((state) => state.app.checkedThree)
  const takeItAll = !all && !without && !one && !two && !three

  return (
    <button
      disabled={!ticketsReady || takeItAll}
      className={styles.btnShowMoreTickets}
      onClick={() => dispatch(showMoreTickets())}
    >
      {!ticketsReady ? 'ЗАГРУЖАЕМ БИЛЕТЫ' : takeItAll ? 'ВЫБЕРИТЕ КОЛИЧЕСТВО ПЕРЕСАДОК' : 'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ'}
    </button>
  )
}

export default BtnShowMoreTickets
