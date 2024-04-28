import React from 'react'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import { parseFlightTimes } from '../../../store/functions'

const TicketInfo = (props) => {
  const { segments } = props
  const { date, destination, duration, origin, stops } = segments
  const { flyFrom, flyTo, hours, minutes } = parseFlightTimes(date, duration)

  return (
    <>
      <div className={styles.bodyInfo}>
        <div className={styles.infoTable}>
          <p className={styles.miniHeader}>
            {destination} - {origin}
          </p>
          <p className={styles.miniText}>
            {flyFrom} - {flyTo}
          </p>
        </div>
        <div className={styles.infoTable}>
          <p className={styles.miniHeader}>В ПУТИ</p>
          <p className={styles.miniText}>
            {hours}ч {minutes}м
          </p>
        </div>
        <div className={styles.infoTable}>
          <p className={styles.miniHeader}>
            {stops?.length === 0 ? 'БЕЗ ПЕРЕСАДОК' : stops?.length + ' ПЕРЕСАДКИ'}
          </p>
          <p className={styles.miniText}>
            {stops?.length === 0 ? 'БЕЗ ПЕРЕСАДОК' : stops?.join('-')}
          </p>
        </div>
      </div>
    </>
  )
}

export default TicketInfo

TicketInfo.propTypes = {
  segments: PropTypes.shape({
    date: PropTypes.string,
    destination: PropTypes.string,
    duration: PropTypes.number,
    origin: PropTypes.string,
    stops: PropTypes.array,
  }).isRequired,
}
