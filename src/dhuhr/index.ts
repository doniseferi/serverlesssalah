import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getDhuhrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errorHandler'
import { getLongitudeValue } from '../geoCoordinates'
import { SalahResponse, ok, unexpectedServerError, salah } from '../response'

const dhuhr: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const date = parseIso8601Date(req.params.date)
    const longitude = getLongitudeValue(req.params.longitude)
    return ok(salah('dhuhr', getDhuhrDateTimeUtc(date, longitude)))
  } catch (e) {
    const handledError = errorHandler(e)
    return handledError ? handledError : unexpectedServerError()
  }
}

export default dhuhr
