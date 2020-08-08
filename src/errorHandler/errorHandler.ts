const errorHandler = (error: Error) =>
  handlers.find((err) => err.name === error.message)

const handlers = [
  {
    name: 'DateNotISO8601Format',
    response: {
      status: 400,
      body: `Please provide a date value in the ISO 8601 format. ISO 8601 Date format is yyyy-MM-dd, heres an example: api/dhuhr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/...`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },
]

export { errorHandler }
