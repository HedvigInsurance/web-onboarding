import { colors } from '@hedviginsurance/brand'
import { Field } from 'formik'
import styled from 'react-emotion'

export const FORMWIDTH = 300
export const FORMWIDTHSMALL = 100

export const InputField = styled(Field)(
  ({ touched, errors }: { touched?: boolean; errors?: string }) => ({
    marginTop: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    minWidth: FORMWIDTH,
    lineHeight: '48px',
    backgroundColor: colors.OFF_WHITE,
    borderRadius: '5px',
    borderRight: 'none',
    borderLeft: 'none',
    borderTop: 'none',
    outline: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: touched
      ? errors
        ? `3px solid ${colors.PINK}`
        : `3px solid ${colors.GREEN}`
      : `3px solid ${colors.PURPLE}`,
    '@media (max-width: 300px)': {
      marginLeft: '10px',
      marginRight: '10px',
      minWidth: FORMWIDTHSMALL,
    },
    '&:focus': {
      borderBottom: `3px solid ${colors.DARK_PURPLE}`,
    },
  }),
)
