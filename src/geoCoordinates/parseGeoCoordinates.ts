type CoordinateConstraints = {
  min: number
  max: number
}

const parseLatitude = (latitude: string): number => {
  try {
    return parseCoordinate(latitude, latitudeConstrains)
  } catch {
    throw new Error('InvalidLatitudeValue')
  }
}

const parseLongitude = (longitude: string): number => {
  try {
    return parseCoordinate(longitude, longitudeConstrains)
  } catch {
    throw new Error('InvalidLongitudeValue')
  }
}

const latitudeConstrains: CoordinateConstraints = {
  min: -90,
  max: 90,
}

const longitudeConstrains: CoordinateConstraints = {
  min: -180,
  max: 180,
}

const parseCoordinate = (
  value: string,
  constraints: CoordinateConstraints,
): number => {
  if (value === null || value === undefined) {
    throw new Error('InvalidGeoCoordinateValue')
  }

  const coordinate = parseFloat(value)

  return hasMetConstraints(coordinate, constraints)
    ? coordinate
    : (() => {
        throw new RangeError('InvalidGeoCoordinateValue')
      })()
}

const hasMetConstraints = (
  value: number,
  constraints: CoordinateConstraints,
): boolean => value >= constraints.min && value <= constraints.max

export { parseLongitude, parseLatitude }
