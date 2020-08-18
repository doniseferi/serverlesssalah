import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import {
  getFajrDateTimeUtc,
  SupportedConventions,
  HighLatitudeMethod,
} from 'salahtimes'
import { parseConvention } from '../../convention'
import { parseIso8601Date } from '../../date'
import { errorHandler } from '../../errors'
import { parseLongitude, parseLatitude } from '../../geoCoordinates'
import { parseHighLatitudeMethod } from '../../highLatitudeMethod'
import {
  SalahResponse,
  ok,
  unexpectedServerError,
  salah,
  badRequest,
} from '../../response'

const fajr: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const date = parseIso8601Date(req.params.date)
    const latitude = parseLatitude(req.params.latitude)
    const longitude = parseLongitude(req.params.longitude)
    const convetion = parseConvention(req.query.convention)
    const highLatitudeMethod = parseHighLatitudeMethod(
      req.query.highLatitudeMethod,
    )
    return ok(
      salah(
        'fajr',
        getFajrDateTimeUtc(
          date,
          latitude,
          longitude,
          convetion,
          highLatitudeMethod,
        ),
      ),
    )
  } catch (e) {
    const expectedError = errorHandler(e)
    return expectedError ? badRequest(expectedError) : unexpectedServerError()
  }
}

export default fajr
