import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getIshaaDateTimeUtc } from 'salahtimes'
import { parseConvention } from '../convention'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errors'
import { parseLongitude, parseLatitude } from '../geoCoordinates'
import { parseHighLatitudeMethod } from '../highLatitudeMethod'
import { toLowerCase } from '../toLowerCase'
import {
  SalahResponse,
  ok,
  unexpectedServerError,
  salah,
  badRequest,
} from '../response'

const ishaa: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const query = toLowerCase(req.query)
    const date = parseIso8601Date(req.params.date)
    const latitude = parseLatitude(req.params.latitude)
    const longitude = parseLongitude(req.params.longitude)
    const convetion = parseConvention(query.get('convention'))
    const highLatitudeMethod = parseHighLatitudeMethod(
      query.get('highlatitudemethod'),
    )
    return ok(
      salah(
        'ishaa',
        getIshaaDateTimeUtc(
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

export default ishaa
