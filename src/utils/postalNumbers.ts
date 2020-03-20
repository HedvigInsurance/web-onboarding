export const formatPostalNumber = (postalNumber: string) => {
  const postalNumberWithoutSpaces = postalNumber.replace(' ', '')
  if (postalNumber.length > 3) {
    return (
      postalNumberWithoutSpaces.substr(0, 3) +
      ' ' +
      postalNumberWithoutSpaces.replace(' ', '').substr(3)
    )
  }

  return postalNumber
}
