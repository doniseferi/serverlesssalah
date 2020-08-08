import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getDhuhrDateTimeUtc } from 'salahtimes'
import { parseIso8601Date } from '../date'

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
  } catch {
    const today = new Date(Date.now()).toISOString().split('T')[0]
    return {
      status: 400,
      body: `Please provide a date value in the ISO 8601 format. ISO 8601 Date format is yyyy-MM-dd, heres an example: api/dhuhr/date/${today}/...`,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}

export default dhuhr
