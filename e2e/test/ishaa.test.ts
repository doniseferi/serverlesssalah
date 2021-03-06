import axios, { AxiosError, AxiosResponse } from 'axios'

describe('fajr function', () => {
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
      .get(
        `http://localhost:7071/api/fajr/date/${date}/latitude/0/longitude/0?code=test`,
      )
      .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
        expect(response.status).toEqual(statusCode)
      })
      .catch((e: AxiosError) => {
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
            `http://localhost:7071/api/fajr/date/2020-01-01/latitude/0/longitude/${longitude}?code=test`,
          )
          .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
            expect(response.status).toEqual(statusCode)
          })
          .catch((e: AxiosError) => {
            expect(e.response?.status).toEqual(statusCode)
          })
      },
    ),
    test.each([
      ['-90', 200],
      ['90', 200],
      ['-89', 200],
      ['89', 200],
      ['-0', 200],
      ['0', 200],
      ['1', 200],
      ['-1', 200],
      ['-90.01', 400],
      ['90.01', 400],
      ['999', 400],
      ['-999', 400],
      ['buzzlightyear', 400],
      ['sherrifwoody', 400],
      [null, 400],
      ['', 404],
    ])(
      `requires a latitude value passed into the path`,
      async (latitude, statusCode) => {
        await axios
          .get(
            `http://localhost:7071/api/fajr/date/2020-01-01/latitude/${latitude}/longitude/0?code=test`,
          )
          .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
            expect(response.status).toEqual(statusCode)
          })
          .catch((e: AxiosError) => {
            expect(e.response?.status).toEqual(statusCode)
          })
      },
    ),
    test('Returns a date time in iso 8601 format string in the body', async () => {
      await axios
        .get(
          'http://localhost:7071/api/fajr/date/2025-01-18/latitude/0/longitude/-0.01015?code=test',
        )
        .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
          expect(response.data.utc).toEqual('2025-01-18T04:53:10.110Z')
          expect(response.data.salah).toEqual('fajr')
        })
    }),
    test('Returns a valid error response on consecutive error calls', async () => {
      await axios
        .get(
          'http://localhost:7071/api/fajr/date/2025-01-18/latitude/0/longitude/-400.01015?code=test',
        )
        .catch(async () => {
          await axios
            .get(
              'http://localhost:7071/api/fajr/date/2025-01-18/latitude/0/longitude/-400.01015?code=test',
            )
            .catch((e: AxiosError<{ field: string; message: string }>) => {
              const error = e.response?.data
              expect(e.response?.status).toEqual(400)
              expect(error?.field).toEqual('longitude')
              expect(error?.message).toEqual(
                `Please provide a longitude value within a range of -180 to 180. Heres an example path: /api/dhuhr/date/${
                  new Date(Date.now()).toISOString().split('T')[0]
                }/longitude/-0.174943`,
              )
            })
        })
    }),
    test.each([
      ['MuslimWorldLeague', 200],
      ['IslamicSocietyOfNorthAmerica', 200],
      ['EgyptianGeneralAuthorityOfSurvey', 200],
      ['UmmAlQuraUniversityMekkah', 200],
      ['UniversityOfIslamicSciencesKarachi', 200],
      ['InstituteOfGeophysicsUniversityOfTehranOfSurvey', 200],
      ['ShiaIthnaAshariLevaResearchInstituteQumOfSurvey', 200],
      ['abc', 400],
      [null, 400],
      [undefined, 400],
    ])(
      `accepts an islamic convention query string in the path`,
      async (convention, statusCode: number) => {
        await axios
          .get(
            `http://localhost:7071/api/fajr/date/2037-08-02/latitude/0/longitude/0?convention=${convention}&code=test`,
          )
          .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
            expect(response.status).toEqual(statusCode)
          })
          .catch((e: AxiosError) => {
            expect(e.response?.status).toEqual(statusCode)
          })
      },
    ),
    test.each([
      ['AngleBasedMethod', 200],
      ['MiddleOfTheNightMethod', 200],
      ['OneSeventhMethod', 200],
      ['abc', 400],
      [null, 400],
      [undefined, 400],
    ])(
      `accepts a high latitude method query string in the path`,
      async (highLatitudeMethod, statusCode: number) => {
        await axios
          .get(
            `http://localhost:7071/api/fajr/date/2037-08-02/latitude/0/longitude/0?convention=MuslimWorldLeague&highLatitudeMethod=${highLatitudeMethod}&code=test`,
          )
          .then((response: AxiosResponse<{ utc: string; salah: string }>) => {
            expect(response.status).toEqual(statusCode)
          })
          .catch((e: AxiosError) => {
            expect(e.response?.status).toEqual(statusCode)
          })
      },
    )
})
