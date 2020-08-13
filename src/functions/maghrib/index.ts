import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getMaghribDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../../date'
import { errorHandler } from '../../errors'
import { getLongitudeValue, getLatitudeValue } from '../../geoCoordinates'
import {
  SalahResponse,
  ok,
  unexpectedServerError,
  salah,
  badRequest,
} from '../../response'

const maghrib: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const date = parseIso8601Date(req.params.date)
    const latitude = getLatitudeValue(req.params.latitude)
    const longitude = getLongitudeValue(req.params.longitude)
    return ok(
      salah('maghrib', getMaghribDateTimeUtc(date, latitude, longitude)),
    )
  } catch (e) {
    const expectedError = errorHandler(e)
    return expectedError ? badRequest(expectedError) : unexpectedServerError()
  }
}

export default maghrib
