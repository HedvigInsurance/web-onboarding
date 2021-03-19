import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMarket } from 'components/utils/CurrentLocale'
import { LanguageIcon } from 'components/icons/LanguageIcon'
import { languagePickerData } from './languagePickerData'

const Wrapper = styled.div`
  position: relative;
`
const Option = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 80px;
  background-color: white;
  border-radius: 5px;
  position: absolute;
  right: 0;
  transform: translateY(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  z-index: 9999;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
`

export const LanguagePicker: React.FC<{ path?: string }> = ({
  path = '/new-member',
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const market = useMarket()

  React.useEffect(() => {
    const clickListener = () => {
      setIsOpen(false)
    }
    document.body.addEventListener('click', clickListener)

    return () => document.body.removeEventListener('click', clickListener)
  }, [])

  return (
    <Wrapper>
      <LanguageDropdownButton onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon />
      </LanguageDropdownButton>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        variants={{
          open: { opacity: 1, y: 0 },
          closed: {
            opacity: 0,
            y: -20,
          },
        }}
        animate={isOpen ? 'open' : 'closed'}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          userSelect: isOpen ? 'auto' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 100 }}
      >
        <Dropdown>
          {languagePickerData[market].map(({ linkTo, title }, index) => (
            <Option key={linkTo}>
              <StyledLink to={`/${linkTo}${path}`}>{title}</StyledLink>
              {index < languagePickerData[market].length - 1 && <Divider />}
            </Option>
          ))}
        </Dropdown>
      </motion.div>
    </Wrapper>
  )
}
