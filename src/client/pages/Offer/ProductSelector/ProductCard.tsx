import React, {
  useRef,
  forwardRef,
  ComponentPropsWithoutRef,
  MouseEventHandler,
} from 'react'
import styled from '@emotion/styled'
import { mergeRefs } from 'react-merge-refs'
import { colorsV3 } from '@hedviginsurance/brand'
import { Switch as Checkbox } from 'components/Switch'
import { MEDIA_QUERIES } from 'utils/mediaQueries'

export type Product = {
  id: string
  name: string
  description: string
  price: string
}

type ProductCardProps = {
  product: Product
} & Required<Pick<ComponentPropsWithoutRef<'input'>, 'checked' | 'onChange'>>

export const ProductCard = forwardRef<HTMLInputElement, ProductCardProps>(
  ({ product, checked, onChange }, forwardedRef) => {
    const checkboxRef = useRef<HTMLInputElement | null>(null)

    const handleClick: MouseEventHandler<HTMLLIElement> = () => {
      checkboxRef.current?.click()
    }

    return (
      <Card selected={checked} onClick={handleClick}>
        <Header>
          <Heading>{product.name}</Heading>
          <Subheading>{product.price}</Subheading>
        </Header>
        <Description>{product.description}</Description>
        <CheckboxWrapper>
          <Checkbox
            ref={mergeRefs([checkboxRef, forwardedRef])}
            checked={checked}
            onChange={onChange}
          />
        </CheckboxWrapper>
      </Card>
    )
  },
)

ProductCard.displayName = 'ProductCard'

const getSelectCardHoverStyles = (selected: boolean) => {
  if (selected) {
    return {
      border: '1px solid transparent',
      outline: `2px solid ${colorsV3.black}`,
      ':hover': {
        cursor: 'pointer',
      },
    }
  }

  return {
    border: `1px solid ${colorsV3.gray500}`,
    outline: 'none',
    ':hover': {
      cursor: 'pointer',
      border: '1px solid transparent',
      outline: `2px solid ${colorsV3.black}`,
    },
  }
}

const Card = styled.li<{ selected: boolean }>(({ selected }) => ({
  all: 'unset',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '28px 12px 12px 12px',
  maxHeight: '9.25rem',
  borderRadius: '8px',
  ...getSelectCardHoverStyles(selected),
  [MEDIA_QUERIES.mediumScreen]: {
    padding: '16px',
  },
}))

const Header = styled.header({
  [MEDIA_QUERIES.mediumScreen]: {
    paddingRight: '1.75rem',
  },
})

const Heading = styled.h1({
  all: 'unset',
  display: 'block',
  fontSize: '1.125rem',
  lineHeight: '1.68rem',
})

const Subheading = styled.h2({
  all: 'unset',
  display: 'block',
  fontSize: '0.875rem',
})

const Description = styled.p({
  margin: 0,
  fontSize: '0.75rem',
  color: colorsV3.gray600,
  [MEDIA_QUERIES.mediumScreen]: {
    fontSize: '0.875rem',
  },
})

const CheckboxWrapper = styled.div({
  position: 'absolute',
  top: '10px',
  right: '10px',
  [MEDIA_QUERIES.mediumScreen]: {
    top: '20px',
    right: '20px',
  },
})
