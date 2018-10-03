import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

export const GetInsuredButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

export const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '18px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
})
