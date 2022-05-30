import React, { useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import { QuoteBundle } from 'data/graphql'
import { ThinTick } from 'components/icons/ThinTick'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'components/Table/Table'
import {
  bundleHasPeril,
  getUniquePerilsForQuoteBundles,
} from 'api/quoteBundleSelectors'
import { ChevronDown } from 'components/icons/ChevronDown'
import { ChevronUp } from 'components/icons/ChevronUp'
import { BREAKPOINTS } from 'utils/mediaQueries'
import {
  AccordionItemProps,
  AccordionItem,
  AccordionActiveContent,
} from 'components/Accordion/Accordion'

type ComparisonTableProps = {
  bundles: QuoteBundle[]
}

const TitleTableCell = styled(TableCell)`
  width: 100%;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.625rem;
  }
`

const PerilTableCell = styled(TableCell)`
  vertical-align: top;
`

const AccordionButton = ({
  isActive,
}: Pick<AccordionItemProps, 'isActive'>) => {
  return (
    <>{isActive ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}</>
  )
}

export const ComparisonTable = ({ bundles }: ComparisonTableProps) => {
  const uniquePerils = getUniquePerilsForQuoteBundles(bundles)
  const [activeIndex, setActiveIndex] = useState<number>()
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumScreen })

  return (
    <>
      <Table fullWidth mt="2rem">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {bundles.map((bundle) => (
              <TableCell key={bundle.displayName} align="center">
                {bundle.displayName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {uniquePerils.map((row, index) => (
            <TableRow key={row.title}>
              <TitleTableCell>
                <AccordionItem
                  key={row.title}
                  isActive={activeIndex === index}
                  setIsActive={(isActive) =>
                    isDesktop && setActiveIndex(isActive ? undefined : index)
                  }
                  disabled={!isDesktop}
                >
                  <Title>
                    {row.title}
                    {isDesktop && (
                      <AccordionButton isActive={activeIndex === index} />
                    )}
                  </Title>
                  <AccordionActiveContent
                    height={activeIndex === index ? 'auto' : 0}
                  >
                    <p>{row.description}</p>
                  </AccordionActiveContent>
                </AccordionItem>
              </TitleTableCell>

              {bundles.map((bundle) => (
                <PerilTableCell
                  key={`${row.title}-${bundle.displayName}`}
                  align="center"
                  color={
                    bundleHasPeril(bundle, row) ? undefined : colorsV3.gray400
                  }
                >
                  {bundleHasPeril(bundle, row) ? <ThinTick /> : <>&mdash;</>}
                </PerilTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
