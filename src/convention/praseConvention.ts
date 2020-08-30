import { SupportedConventions } from 'salahtimes'

const parseConvention = (value: string | undefined): SupportedConventions =>
  !value
    ? 'MuslimWorldLeague'
    : (() => {
        const convention = conventionsMap.get(value.toLowerCase())
        return convention
          ? convention
          : (() => {
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
