const toLowerCase = (indexed: { [key: string]: string }): Map<string, string> =>
  Object.keys(indexed).reduce(
    (previousKey, currentKey) =>
      previousKey.set(currentKey.toLowerCase(), indexed[currentKey]),
    new Map<string, string>(),
  )

export { toLowerCase }
