import { parseISO, format, addMinutes } from 'date-fns'

export function parseFlightTimes(date, duration) {
  const originalDate = parseISO(date)
  const flyFrom = format(originalDate, 'HH:mm')
  const arrivalDate = addMinutes(originalDate, duration)
  const flyTo = format(arrivalDate, 'HH:mm')

  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return { flyFrom, flyTo, hours, minutes }
}
