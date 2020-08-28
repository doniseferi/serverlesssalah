import { salahError, SalahError } from './'

const errorHandler = (error: Error): SalahError =>
  handlers.find((err) => err.name === error.message)?.error

const handlers = [
  {
    name: 'NoSupportedConventionError',
    error: salahError(
      `Please provide one of the follow values: "MuslimWorldLeague", "IslamicSocietyOfNorthAmerica", "EgyptianGeneralAuthorityOfSurvey", "UmmAlQuraUniversityMekkah", "UniversityOfIslamicSciencesKarachi", "InstituteOfGeophysicsUniversityOfTehranOfSurvey", "ShiaIthnaAshariLevaResearchInstituteQumOfSurvey" or do not provide the convention query string as it is not manditory. Heres an example: /api/fajr/date/2021-02-15/latitude/51.522079/longitude/-0.191380?convention=islamicsocietyofnorthamerica&highLatitudeMethod=oneseventhmethod"`,
      'convention',
    ),
  },
  {
    name: 'NotSupportedHighLatitudeMethodError',
    error: salahError(
      `Please provide one of the follow values: "AngleBasedMethod", "MiddleOfTheNightMethod", "OneSeventhMethod" or do not provide the highlatitudeMethod query string as it is not manditory. Heres an example: /api/fajr/date/2021-02-15/latitude/51.522079/longitude/-0.191380?convention=islamicsocietyofnorthamerica&highLatitudeMethod=oneseventhmethod"`,
      'highLatitudeMethod',
    ),
  },
  {
    name: 'DateNotISO8601Format',
    error: salahError(
      `Please provide a date value in the ISO 8601 format. ISO 8601 Date format is yyyy-MM-dd, heres an example path: /api/dhuhr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/longitude/-0.174943`,
      'date',
    ),
  },
  {
    name: 'InvalidLongitudeValue',
    error: salahError(
      `Please provide a longitude value within a range of -180 to 180. Heres an example path: /api/dhuhr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/longitude/-0.174943`,
      'longitude',
    ),
  },
  {
    name: 'InvalidLatitudeValue',
    error: salahError(
      `Please provide a latitude value within a range of -90 to 90. Heres an example path: /api/maghrib/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/latitude/51.522079/longitude/-0.174943`,
      'latitude',
    ),
  },
  {
    name: 'NotSupportedMadhabError',
    error: salahError(
      `Madhab is an optional query string. When provided only the following are accepted values standard', 'shafii', 'maliki', 'hanbali' and 'hanafi. Heres an example path: /api/asr/date/${
        new Date(Date.now()).toISOString().split('T')[0]
      }/latitude/51.522079/longitude/-0.174943?madhab=shaafi`,
      'madhab',
    ),
  },
]

export { errorHandler }
