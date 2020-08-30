import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getAsrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errors'
import { parseLongitude, parseLatitude } from '../geoCoordinates'
import { parseMadhab } from '../madhab'
import {
  SalahResponse,
  ok,
  unexpectedServerError,
  salah,
  badRequest,
} from '../response'
import { toLowerCase } from '../toLowerCase'

const asr: AzureFunction = async function (
  _context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const query = toLowerCase(req.query)
    const date = parseIso8601Date(req.params.date)
    const latitude = parseLatitude(req.params.latitude)
    const longitude = parseLongitude(req.params.longitude)
    const madhab = parseMadhab(query.get('madhab'))

    return ok(
      salah('asr', getAsrDateTimeUtc(date, latitude, longitude, madhab)),
    )
  } catch (e) {
    const expectedError = errorHandler(e)
    return expectedError ? badRequest(expectedError) : unexpectedServerError()
  }
}

export { asr }
