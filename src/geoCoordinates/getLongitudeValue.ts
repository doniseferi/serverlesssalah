//TODO: refactor

const getLongitudeValue = (longitude: string): number => {
  if (longitude === null || longitude === undefined) {
    throw new Error('InvalidLongitudeValue')
  }

  const value = parseFloat(longitude)

  return isValidLongitudeValue(value)
    ? value
    : (() => {
        throw new RangeError('InvalidLongitudeValue')
      })()
}

const getLatitudeValue = (latitude: string): number => {
  if (latitude === null || latitude === undefined) {
    throw new Error('InvalidLongitudeValue')
  }

  const value = parseFloat(latitude)

  return isValidLatitudeValue(value)
    ? value
    : (() => {
        throw new RangeError('InvalidLongitudeValue')
      })()
}

const isValidLatitudeValue = (longitude: number): boolean =>
  longitude >= -90 && longitude <= 90

const isValidLongitudeValue = (longitude: number): boolean =>
  longitude >= -180 && longitude <= 180

export { getLongitudeValue, getLatitudeValue }
