type SalahError = {
  message: string
  field: string
}

const salahError = (message: string, field: string): SalahError =>
  !message
    ? (function () {
        throw new ReferenceError(
          'message is null, undefined or an emmpty string',
        )
      })()
    : !field
    ? (function () {
        throw new ReferenceError('field is null, undefined or an emmpty string')
      })()
    : {
        message,
        field,
      }

export { SalahError, salahError }
