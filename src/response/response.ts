type SalahResponse = {
  headers: { [key: string]: string }
  status: number
  body?: string
}

const ok = (body: string): SalahResponse =>
  !body
    ? unexpectedServerError()
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        body: body,
      }

const badRequest = (message: string): SalahResponse =>
  !message
    ? unexpectedServerError()
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
        body: message,
      }

const unexpectedServerError = (): SalahResponse => ({
  headers: {
    'Content-Type': 'application/json',
  },
  status: 500,
})

export { SalahResponse, ok, badRequest, unexpectedServerError }
