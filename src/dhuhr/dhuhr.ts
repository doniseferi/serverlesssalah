import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getDhuhrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errors'
import { parseLongitude } from '../geoCoordinates'
import {
  SalahResponse,
  ok,
  unexpectedServerError,
  salah,
  badRequest,
} from '../response'

const dhuhr: AzureFunction = async function (
  _context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const date = parseIso8601Date(req.params.date)
    const longitude = parseLongitude(req.params.longitude)
    return ok(salah('dhuhr', getDhuhrDateTimeUtc(date, longitude)))
  } catch (e) {
    const expectedError = errorHandler(e)
    return expectedError ? badRequest(expectedError) : unexpectedServerError()
  }
}

export { dhuhr }
