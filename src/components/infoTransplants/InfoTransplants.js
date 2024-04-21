import React from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  switchCheckedAll,
  switchCheckedOne,
  switchCheckedThree,
  switchCheckedTwo,
  switchCheckedWithout,
} from '../../store/appSlice'

const InfoTransplants = (props) => {
  const dispatch = useDispatch()

  const isCheckedAll = useSelector((state) => state.app.checkedAll)
  const isCheckedWithout = useSelector((state) => state.app.checkedWithout)
  const isCheckedOne = useSelector((state) => state.app.checkedOne)
  const isCheckedTwo = useSelector((state) => state.app.checkedTwo)
  const isCheckedThree = useSelector((state) => state.app.checkedThree)

  const handleCheckedAll = () => {
    dispatch(switchCheckedAll())
  }

  const handleCheckedWithout = () => {
    dispatch(switchCheckedWithout())
  }

  const handleCheckedOne = () => {
    dispatch(switchCheckedOne())
  }

  const handleCheckedTwo = () => {
    dispatch(switchCheckedTwo())
  }

  const handleCheckedThree = () => {
    dispatch(switchCheckedThree())
  }

  return (
    <div className={styles.infoTransplants}>
      <div className={styles.headerInfo}>
        <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      </div>
      <div className={styles.info}>
        <ul className={styles.listWrap}>
          <li>
            <label>
              <input type="checkbox" checked={isCheckedAll} onChange={handleCheckedAll} className={styles.checkbox} />
              <span></span>
              <p className={styles.infoCheckboxText}>Все</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={isCheckedWithout}
                onChange={handleCheckedWithout}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>Без пересадок</p>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" checked={isCheckedOne} onChange={handleCheckedOne} className={styles.checkbox} />
              <span></span>
              <p className={styles.infoCheckboxText}>1 пересадка</p>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" checked={isCheckedTwo} onChange={handleCheckedTwo} className={styles.checkbox} />
              <span></span>
              <p className={styles.infoCheckboxText}>2 пересадки</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={isCheckedThree}
                onChange={handleCheckedThree}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>3 пересадки</p>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default InfoTransplants
