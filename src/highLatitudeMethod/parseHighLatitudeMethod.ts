import { HighLatitudeMethod } from 'salahtimes'

const parseHighLatitudeMethod = (
  value: string | undefined,
): HighLatitudeMethod =>
  !value
    ? 'AngleBasedMethod'
    : (() => {
        const highLatitudeMethod = highLatitudeMethodMap.get(
          value.toLowerCase(),
        )
        return highLatitudeMethod
          ? highLatitudeMethod
          : (() => {
              throw new Error('NotSupportedHighLatitudeMethodError')
            })()
      })()

const highLatitudeMethodMap: Map<string, HighLatitudeMethod> = new Map<
  string,
  HighLatitudeMethod
>([
  ['AngleBasedMethod'.toLowerCase(), 'AngleBasedMethod'],
  ['MiddleOfTheNightMethod'.toLowerCase(), 'MiddleOfTheNightMethod'],
  ['OneSeventhMethod'.toLowerCase(), 'OneSeventhMethod'],
])

export { parseHighLatitudeMethod }
