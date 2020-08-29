import { Madhab } from 'salahtimes'

const parseMadhab = (value: string): Madhab =>
  !value
    ? 'Standard'
    : (() => {
        const madhab = madhaabs.get(value.toLowerCase())
        return madhab
          ? madhab
          : (() => {
              throw new Error('NotSupportedMadhabError')
            })()
      })()

const madhaabs: Map<string, Madhab> = new Map<string, Madhab>([
  ['standard'.toLowerCase(), 'Standard'],
  ['shafii'.toLowerCase(), 'Shafii'],
  ['maliki'.toLowerCase(), 'Maliki'],
  ['hanbali'.toLowerCase(), 'Hanbali'],
  ['hanafi'.toLowerCase(), 'Hanafi'],
])

export { parseMadhab }
