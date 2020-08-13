import { Context } from '@azure/functions'
import { HttpRequest } from '@azure/functions'
import { Substitute } from '@fluffy-spoon/substitute'
import maghrib from './index'
import { SalahResponse, Salah } from '../../response'
import { SalahError } from '../../errors'

describe('maghrib function', () => {
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
    ['', 400],
    [null, 400],
  ])(`requires an iso 8601 date in the path`, async (date, statusCode) => {
    const request = Substitute.for<HttpRequest>()
    ;(request.params.returns as any)({
      date,
      latitude: 0,
      longitude: 0,
    })
    ;(request.body.returns as any)({})

    const context = Substitute.for<Context>()
    ;(context.req as any).returns({ req: request })

    const response = await maghrib(context, request)

    expect(response.status).toBe(statusCode)
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
      ['', 400],
    ])(
      `requires a longitude value passed into the path`,
      async (longitude, statusCode) => {
        const request = Substitute.for<HttpRequest>()
        ;(request.params.returns as any)({
          date: '2020-01-01',
          latitude: 0,
          longitude,
        })
        ;(request.body.returns as any)({})
        const context = Substitute.for<Context>()
        ;(context.req as any).returns({
          req: request,
        })

        const response = await maghrib(context, request)

        const response2 = await maghrib(context, request)

        expect(response.status).toBe(statusCode)
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
      ['', 400],
    ])(
      `requires a latitude value passed into the path`,
      async (latitude, statusCode) => {
        const request = Substitute.for<HttpRequest>()
        ;(request.params.returns as any)({
          date: '2020-01-01',
          latitude,
          longitude: 0,
        })
        ;(request.body.returns as any)({})

        const context = Substitute.for<Context>()
        ;(context.req as any).returns({ req: request })

        const response = await maghrib(context, request)

        if (response.status === 500) {
          let x = ' '
        }

        await maghrib(context, request)

        expect(response.status).toBe(statusCode)
      },
    ),
    test('Returns a date time in iso 8601 format string in the body', async () => {
      const request = Substitute.for<HttpRequest>()
      ;(request.params.returns as any)({
        date: '2037-08-02',
        latitude: '42.637610',
        longitude: '21.09216',
      })
      const context = Substitute.for<Context>()
      ;(context.req as any).returns({
        req: request,
      })

      const response: SalahResponse = await maghrib(context, request)
      const data = response.body as Salah
      expect(data).not.toBe(null)
      expect(data.salah).toBe('maghrib')
      expect(data.value).toBe('2037-08-02T17:59:44.318Z')
    }),
    test('Returns a valid error response on consecutive error calls', async () => {
      const request = Substitute.for<HttpRequest>()
      ;(request.params.returns as any)({
        date: '20201-18',
        latitude: 900,
        longitude: -400.01015,
      })

      const context = Substitute.for<Context>()
      ;(context.req as any).returns({ req: request })

      expect((await maghrib(context, request)).body as SalahError).not.toBe(
        null,
      )
      expect((await maghrib(context, request)).body as SalahError).toBe(
        (await maghrib(context, request)).body as SalahError,
      )
    })
})
