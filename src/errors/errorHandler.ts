import { salahError, SalahError } from './'

const errorHandler = (error: Error): SalahError =>
  handlers.find((err) => err.name === error.message)?.error

const handlers = [
  {
    name: 'DateNotISO8601Format',
    error: salahError(
      `Please provide a date value in the ISO 8601 format. ISO 8601 Date format is yyyy-MM-dd, heres an example: api/dhuhr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/-0.174943`,
      'date',
    ),
  },
  {
    name: 'InvalidLongitudeValue',
    error: salahError(
      `Please provide a longitude value within a range of -180 to 180. Heres an example: api/dhuhr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/longitude/-0.174943`,
      'longitude',
    ),
  },
]

export { errorHandler }
