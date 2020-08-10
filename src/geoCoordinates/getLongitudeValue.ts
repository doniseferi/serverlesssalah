const getLongitudeValue = (longitude: string): number => {
  if (!longitude) {
    throw new Error('InvalidLongitudeValue')
  }

  const value = parseFloat(longitude)

  return isValidLongitudeValue(value)
    ? value
    : (() => {
        throw new RangeError('InvalidLongitudeValue')
      })()
}

const isValidLongitudeValue = (longitude: number): boolean =>
  longitude >= -180 && longitude <= 180

export { getLongitudeValue }
