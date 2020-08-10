import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getDhuhrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errorHandler'
import { getLongitudeValue } from '../geoCoordinates'
import { SalahResponse } from './response'
//todo: move to own file

// type Response = {
//   status: number
//   body: string
//   headers: { [key: string]: string }
// }

const dhuhr: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<SalahResponse> {
  try {
    const date = parseIso8601Date(req.params.date)
    const longitude = getLongitudeValue(req.params.longitude)

    return {
      status: 200,
      body: getDhuhrDateTimeUtc(date, longitude),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (e) {
    const handledError = errorHandler(e)
    return handledError
      ? handledError.response
      : {
          status: 500,
          body: `Unexpected Error`,
          headers: {
            'Content-Type': 'application/json',
          },
        }
  }
}

export default dhuhr
