import { Context } from '@azure/functions'
import { HttpRequest } from '@azure/functions'
import { Substitute } from '@fluffy-spoon/substitute'
import { asr } from './asr'
import { SalahResponse, Salah } from '../response'
import { SalahError } from '../errors'

describe('asr function', () => {
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
    ;(request.query.returns as any)({})

    const context = Substitute.for<Context>()
    ;(context.req as any).returns({ req: request })

    const response = await asr(context, request)

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
        ;(request.query.returns as any)({})
        const context = Substitute.for<Context>()
        ;(context.req as any).returns({
          req: request,
        })

        const response = await asr(context, request)

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
        ;(request.query.returns as any)({})

        const context = Substitute.for<Context>()
        ;(context.req as any).returns({ req: request })

        const response = await asr(context, request)

        await asr(context, request)

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
      ;(request.query.returns as any)({})
      const context = Substitute.for<Context>()
      ;(context.req as any).returns({
        req: request,
      })

      const response: SalahResponse = await asr(context, request)
      const data = response.body as Salah
      expect(data).not.toBe(null)
      expect(data.salah).toBe('asr')
      expect(data.utc).toBe('2037-08-02T14:39:36.279Z')
    }),
    test('Returns a valid error response on consecutive error calls', async () => {
      const request = Substitute.for<HttpRequest>()
      ;(request.params.returns as any)({
        date: '20201-18',
        latitude: 900,
        longitude: -400.01015,
      })
      ;(request.query.returns as any)({})

      const context = Substitute.for<Context>()
      ;(context.req as any).returns({ req: request })

      expect((await asr(context, request)).body as SalahError).not.toBe(null)
      expect((await asr(context, request)).body as SalahError).toBe(
        (await asr(context, request)).body as SalahError,
      )
    }),
    test.each([
      ['Standard', 200],
      ['Shafii', 200],
      ['Maliki', 200],
      ['Hanbali', 200],
      ['Hanafi', 200],
      [null, 200],
      [undefined, 200],
      ['', 200],
      ['as', 400],
      ['hilbala', 400],
    ])(
      `accepts a madhab query string in the path`,
      async (madhab, statusCode: number) => {
        const request = Substitute.for<HttpRequest>()
        ;(request.params.returns as any)({
          date: '2037-08-02',
          latitude: 0,
          longitude: 0,
        })
        ;(request.query.returns as any)({
          madhab: madhab,
        })
        ;(request.body.returns as any)({})

        const context = Substitute.for<Context>()
        ;(context.req as any).returns({ req: request })

        const response = await asr(context, request)

        expect(response.status).toBe(statusCode)
      },
    )
})
