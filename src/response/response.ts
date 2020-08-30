import { SalahError, salahError } from '../errors'

type SalahResponse = {
  headers: { [key: string]: string }
  status: number
  body: Salah | SalahError
}

type Salah = {
  salah: string
  utc: string
}

const salah = (name: string, value: string): Salah =>
  !name
    ? (() => {
        throw new ReferenceError('name is null, undefined or an emmpty string')
      })()
    : !value
    ? (() => {
        throw new ReferenceError('name is null, undefined or an emmpty string')
      })()
    : { salah: name, utc: value }

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

const badRequest = (error: SalahError): SalahResponse =>
  !error
    ? unexpectedServerError()
    : {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
        body: error,
      }

const unexpectedServerError = (
  error: SalahError = salahError(
    'An unexpected error has occured. Please try again.',
    '__none__',
  ),
): SalahResponse => ({
  headers: {
    'Content-Type': 'application/json',
  },
  status: 500,
  body: error,
})

export { SalahResponse, Salah, salah, ok, badRequest, unexpectedServerError }
