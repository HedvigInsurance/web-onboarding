import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { LanguageIcon } from 'components/icons/LanguageIcon'
import { motion } from 'framer-motion'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
`

const LanguageDropdownButton = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  outline: 0;
`

const StyledLink = styled(Link)`
  outline: 0;
  color: ${colorsV2.black};
  text-decoration: none;
  padding: 10px 20px;
  transition: all 250ms;
  background-color: white;
  font-size: 0.9rem;

  :active {
    background-color: ${colorsV2.lightgray};
  }
`

const Divider = styled.span`
  height: 1px;
  width: 100%;
  background-color: ${colorsV2.lightgray};
`

const Dropdown = styled.div`
  background-color: white;
  border-radius: 5px;
  position: fixed;
  transform: translateX(-40%) translateY(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const LanguagePicker = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Wrapper>
      <LanguageDropdownButton onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon />
      </LanguageDropdownButton>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={
          isOpen
            ? { opacity: 1, y: 0, pointerEvents: 'auto', userSelect: 'auto' }
            : { opacity: 0, y: -20, pointerEvents: 'none', userSelect: 'none' }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 100 }}
      >
        <Dropdown>
          <StyledLink to="/new-member">Svenska</StyledLink>
          <Divider />
          <StyledLink to="/en/new-member">English</StyledLink>
        </Dropdown>
      </motion.div>
    </Wrapper>
  )
}
