export const formatPostalNumber = (postalNumber: string) => {
  const postalNumberWithoutSpaces = postalNumber.replace(' ', '')
  if (postalNumber.length === 4) {
    return postalNumberWithoutSpaces
  }

  if (postalNumber.length === 5) {
    return (
      postalNumberWithoutSpaces.substr(0, 3) +
      ' ' +
      postalNumberWithoutSpaces.substr(3)
    )
  }

  return postalNumber
}
