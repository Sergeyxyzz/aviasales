import React from 'react'
import styles from './styles.module.scss'
import PropTypes from 'prop-types'
import TicketInfo from './ticketInfo/TicketInfo'

const Ticket = ({ price, carrier, segments }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketInfo}>
        <div className={styles.header}>
          <div className={styles.price}>{price} P</div>
          <div>
            <img src={`http://pics.avs.io/120/30/${carrier}.png`} alt="logo" />
          </div>
        </div>
        <TicketInfo segments={segments[0]} />
        <TicketInfo segments={segments[1]} />
      </div>
    </div>
  )
}

export default Ticket

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf().isRequired,
}
