type SalahResponse = {
  headers: { [key: string]: string }
  status: number
  body: Salah | Error
}

type Salah = {
  salah: string
  value: string
}

type Error = {
  message: string
  field: string
}

const salah = (name: string, value: string): Salah =>
  !name
    ? (function () {
        throw new ReferenceError()
      })()
    : !value
    ? (function () {
        throw new ReferenceError()
      })()
    : { salah: name, value }

const error = (message: string, field: string): Error => ({ message, field })

const ok = (body: Salah): SalahResponse =>
  !body
    ? unexpectedServerError()
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        body: body,
      }

const badRequest = (error: Error): SalahResponse =>
  !error
    ? unexpectedServerError()
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
        body: error,
      }

const unexpectedServerError = (): SalahResponse => ({
  headers: {
    'Content-Type': 'application/json',
  },
  status: 500,
  body: error('An unexpected error has occured. Please try again.', null),
})

export {
  SalahResponse,
  Salah,
  Error,
  salah,
  error,
  ok,
  badRequest,
  unexpectedServerError,
}
