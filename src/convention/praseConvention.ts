import { SupportedConventions } from 'salahtimes'

const parseConvention = (value: string): SupportedConventions =>
  !value
    ? 'MuslimWorldLeague'
    : (function () {
        const convention = conventionsMap.get(value.toLowerCase())
        return convention
          ? convention
          : (function () {
              throw new Error('NoSupportedConventionError')
            })()
      })()

const conventionsMap: Map<string, SupportedConventions> = new Map<
  string,
  SupportedConventions
>([
  ['MuslimWorldLeague'.toLowerCase(), 'MuslimWorldLeague'],
  [
    'IslamicSocietyOfNorthAmerica'.toLowerCase(),
    'IslamicSocietyOfNorthAmerica',
  ],
  [
    'EgyptianGeneralAuthorityOfSurvey'.toLowerCase(),
    'EgyptianGeneralAuthorityOfSurvey',
  ],
  ['UmmAlQuraUniversityMekkah'.toLowerCase(), 'UmmAlQuraUniversityMekkah'],
  [
    'UniversityOfIslamicSciencesKarachi'.toLowerCase(),
    'UniversityOfIslamicSciencesKarachi',
  ],
  [
    'InstituteOfGeophysicsUniversityOfTehranOfSurvey'.toLowerCase(),
    'InstituteOfGeophysicsUniversityOfTehranOfSurvey',
  ],
  [
    'ShiaIthnaAshariLevaResearchInstituteQumOfSurvey'.toLowerCase(),
    'ShiaIthnaAshariLevaResearchInstituteQumOfSurvey',
  ],
])

export { parseConvention }
