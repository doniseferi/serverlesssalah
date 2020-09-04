import { Salah } from '../../src/response/'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { SalahError } from '../../src/errors'

describe('dhuhr function', () => {
  test.each([
    ['2020-06-08', 200],
    ['20200608', 200],
    ['1987-01-27', 200],
    ['19870127', 200],
    ['2016-02-29', 200],
    ['20160229', 200],
    ['2014-29-02', 400],
    ['2020-06-06-02', 400],
    ['2020060', 400],
    ['202006', 400],
    ['20200', 400],
    ['2020', 400],
    ['2020-06-0', 400],
    ['2020-06', 400],
    ['1020-0', 400],
    ['2020', 400],
    ['abc', 400],
    ['', 404],
    [null, 400],
  ])(`requires an iso 8601 date in the path`, async (date, statusCode) => {
    await axios
      .get(`http://localhost:7071/api/dhuhr/date/${date}/longitude/0?code=test`)
      .then((response: AxiosResponse<Salah>) => {
        expect(response.status).toEqual(statusCode)
      })
      .catch((e: AxiosError<SalahError>) => {
        expect(e.response?.status).toEqual(statusCode)
      })
  }),
    test.each([
      ['-180', 200],
      ['180', 200],
      ['-179', 200],
      ['179', 200],
      ['-0', 200],
      ['0', 200],
      ['1', 200],
      ['-1', 200],
      ['-180.01', 400],
      ['180.01', 400],
      ['999', 400],
      ['-999', 400],
      ['buzzlightyear', 400],
      ['sherrifwoody', 400],
      [null, 400],
      ['', 404],
    ])(
      `requires a longitude value passed into the path`,
      async (longitude, statusCode) => {
        await axios
          .get(
            `http://localhost:7071/api/dhuhr/date/2020-01-01/longitude/${longitude}?code=test`,
          )
          .then((response: AxiosResponse<Salah>) => {
            expect(response.status).toEqual(statusCode)
          })
          .catch((e: AxiosError<SalahError>) => {
            expect(e.response?.status).toEqual(statusCode)
          })
      },
    ),
    test('Returns a date time in iso 8601 format string in the body', async () => {
      await axios
        .get(
          'http://localhost:7071/api/dhuhr/date/2025-01-18/longitude/-0.01015?code=test',
        )
        .then((response: AxiosResponse<Salah>) => {
          expect(response.data.utc).toEqual('2025-01-18T12:10:20.853Z')
          expect(response.data.salah).toEqual('dhuhr')
        })
    })
  test('Returns a valid error response on consecutive error calls', async () => {
    await axios
      .get(
        'http://localhost:7071/api/dhuhr/date/2025-01-18/longitude/-400.01015?code=test',
      )
      .catch((e: AxiosError<SalahError>) => {
        const error = e.response?.data
        expect(e.response?.status).toEqual(400)
        expect(error?.field).toEqual('longitude')
        expect(error?.message).toEqual(
          'Please provide a longitude value within a range of -180 to 180. Heres an example path: /api/dhuhr/date/2020-09-03/longitude/-0.174943',
        )
      })
  })
})
