import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {getAsrDateTimeUtc} from 'salahtimes'

type Response = { status: number; body: string; headers: { 'Content-Type': string; }; }

const dhuhr: AzureFunction = async function (
    context: Context, 
    req: HttpRequest): Promise<Response> {
    const dateFromParams = req.params.date.match(
        /^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/);
        
    if (!dateFromParams) {
            
        const today = new Date(Date.now())
        return {
            status: 400,
            body: `Please provide a date value in the Iso 8601 format. Example api/dhuhr/date/${today.getUTCFullYear}-${today.setMonth}-${today.getUTCDate}/...`,
            headers: {
                'Content-Type': 'application/json'
            } 
        }
        
    }
    
    const year = parseInt(dateFromParams[1])
    const month = parseInt(dateFromParams[3])
    const date = parseInt(dateFromParams[4])
    const utc = Date.UTC(year, month, date);

    return {
        status: 200,
        body: JSON.stringify({date: dateFromParams}),
        headers: {
            'Content-Type': 'application/json'
        } 
    };
}

export default dhuhr;