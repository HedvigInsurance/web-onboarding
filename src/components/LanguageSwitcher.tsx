import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { withRouter } from 'react-router'

const LocalizationIconSvg: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 510 510"
    className={className}
  >
    <path d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm175.95 153H357c-7.65-33.15-20.4-61.2-35.7-91.8 45.9 17.85 86.7 48.45 109.65 91.8zM255 51c20.4 30.6 38.25 63.75 48.45 102h-96.9c10.2-35.7 28.05-71.4 48.45-102zM58.65 306c-5.1-15.3-7.65-33.15-7.65-51s2.55-35.7 7.65-51h86.7c-2.55 17.85-2.55 33.15-2.55 51s2.55 33.15 2.55 51h-86.7zm20.4 51H153c7.65 33.15 20.4 61.2 35.7 91.8-45.9-17.85-86.7-48.45-109.65-91.8zM153 153H79.05c25.5-43.35 63.75-73.95 109.65-91.8-15.3 30.6-28.05 58.65-35.7 91.8zm102 306c-20.4-30.6-38.25-63.75-48.45-102h96.9c-10.2 35.7-28.05 71.4-48.45 102zm58.65-153h-117.3c-2.55-17.85-5.1-33.15-5.1-51s2.55-33.15 5.1-51H316.2c2.55 17.85 5.1 33.15 5.1 51s-5.1 33.15-7.65 51zm7.65 142.8c15.3-28.05 28.05-58.649 35.7-91.8h73.95C408 400.35 367.2 430.95 321.3 448.8zM367.2 306c2.55-17.85 2.55-33.15 2.55-51s-2.55-33.15-2.55-51h86.7c5.1 15.3 7.649 33.15 7.649 51s-2.55 35.7-7.649 51h-86.7z" />
  </svg>
)

const LanguageSwitcherWrapper = styled('div')(
  ({ isOpen }: { isOpen: boolean }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 70,
    boxShadow: isOpen ? '1px 3px 5px rgba(0, 0, 0, .1)' : 'none',
    marginRight: '.5rem',
  }),
)
const ToggleButton = styled('button')({
  appearance: 'none',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
})
const LocalizationIcon = styled(LocalizationIconSvg)({
  width: '1.75rem',
  height: '1.75rem',
  '@media (max-width: 600px)': {
    width: '1.5rem',
    height: '1.5rem',
  },
})
const LanguageSwitcherDropdown = styled('ul')({
  position: 'absolute',
  top: '100%',
  right: 0,
  textAlign: 'right',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  backgroundColor: '#fff',
  boxShadow: '2px 3px 5px rgba(0, 0, 0, .1)',
})
const Language = styled('li')({
  padding: 0,
  margin: 0,
  display: 'block',
})
const LanguageLink = styled('a')({
  display: 'block',
  padding: '12px 24px',
  color: 'inherit',
  textDecoration: 'none',

  '&:hover, &:focus': {
    textDecoration: 'none',
    color: 'inherit',
  },
})

const LOCALE_PATTERN = /^\/(en\/)/
const getLocalizedPath = (locale: string, path: string) => {
  if ((locale === '' || locale === 'sv') && !LOCALE_PATTERN.test(path)) {
    return path
  }

  return (`/${locale}/` + path.replace(LOCALE_PATTERN, '')).replace(
    /\/{2,}/,
    '/',
  )
}

export const LanguageSwitcher = withRouter(({ location }) => (
  <Container<{ isOpen: boolean }, { open: () => void; close: () => void }>
    initialState={{ isOpen: false }}
    actions={{
      open: () => () => ({ isOpen: true }),
      close: () => () => ({ isOpen: false }),
    }}
  >
    {({ isOpen, open, close }) => (
      <LanguageSwitcherWrapper isOpen={isOpen}>
        <ToggleButton onClick={isOpen ? close : open}>
          <LocalizationIcon />
        </ToggleButton>
        {isOpen && (
          <LanguageSwitcherDropdown>
            <Language>
              <LanguageLink href={getLocalizedPath('en', location.pathname)}>
                English
              </LanguageLink>
            </Language>
            <Language>
              <LanguageLink href={getLocalizedPath('', location.pathname)}>
                Svenska
              </LanguageLink>
            </Language>
          </LanguageSwitcherDropdown>
        )}
      </LanguageSwitcherWrapper>
    )}
  </Container>
))
