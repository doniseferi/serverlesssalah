import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getDhuhrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'
import { errorHandler } from '../errorHandler'

type Response = {
  status: number
  body: string
  headers: { 'Content-Type': string }
}

const dhuhr: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<Response> {
  try {
    const date = parseIso8601Date(req.params.date)

    return {
      status: 200,
      body: getDhuhrDateTimeUtc(date, -0.174943),
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
