import React from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import {
  switchCheckedAll,
  switchCheckedOne,
  switchCheckedThree,
  switchCheckedTwo,
  switchCheckedWithout,
} from '../../store/filterSlice'

import {
  selectCheckedAll,
  selectCheckedWithout,
  selectCheckedOne,
  selectCheckedTwo,
  selectCheckedThree,
} from '../../store/selectors'

const InfoTransplants = (props) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.infoTransplants}>
      <div className={styles.headerInfo}>
        <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      </div>
      <div className={styles.info}>
        <ul className={styles.listWrap}>
          <li>
            <label>
              <input
                type="checkbox"
                checked={useSelector(selectCheckedAll)}
                onChange={() => dispatch(switchCheckedAll())}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>Все</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={useSelector(selectCheckedWithout)}
                onChange={() => dispatch(switchCheckedWithout())}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>Без пересадок</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={useSelector(selectCheckedOne)}
                onChange={() => dispatch(switchCheckedOne())}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>1 пересадка</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={useSelector(selectCheckedTwo)}
                onChange={() => dispatch(switchCheckedTwo())}
                className={styles.checkbox}
              />
              <span></span>
              <p className={styles.infoCheckboxText}>2 пересадки</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={useSelector(selectCheckedThree)}
                onChange={() => dispatch(switchCheckedThree())}
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
