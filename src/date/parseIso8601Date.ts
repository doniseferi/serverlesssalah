const parseIso8601Date = (isoDate: string): Date => {
  const iso8601DateRegex = /^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/
  const dateFromParams = isoDate.match(iso8601DateRegex)

  if (!dateFromParams) {
    throw new Error('DateNotISO8601Format')
  }

  const year = parseInt(dateFromParams[1])
  const month = parseInt(dateFromParams[3])
  const date = parseInt(dateFromParams[4])
  const utc = Date.UTC(year, month, date)
  return new Date(utc)
}

export { parseIso8601Date }
