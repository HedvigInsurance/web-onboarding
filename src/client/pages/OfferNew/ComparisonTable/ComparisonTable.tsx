import React, { useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import { QuoteBundle, PerilV2 } from 'data/graphql'
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

type ComparisonTableProps = {
  bundles: QuoteBundle[]
}

type AccordionProps = {
  bundles: QuoteBundle[]
  row: PerilV2
}

const RowTitle = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.625rem;
  }
`

const RowDescription = styled.p`
  font-size: 0.875rem;
  color: ${colorsV3.gray700};
`

const AccordionRow = styled(TableRow)`
  cursor: pointer;
`

const TitleTableCell = styled(TableCell)`
  max-width: 20rem;
`

const PerilTableCell = styled(TableCell)`
  vertical-align: top;
`

const Accordion = ({ bundles, row }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <AccordionRow key={row.title} onClick={() => setIsActive(!isActive)}>
      <TitleTableCell>
        <RowTitle>
          {row.title}{' '}
          {isActive ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
        </RowTitle>
        {isActive && <RowDescription>{row.description}</RowDescription>}
      </TitleTableCell>
      {bundles.map((bundle) => (
        <PerilTableCell
          key={`${row.title}-${bundle.displayName}`}
          align="center"
          color={bundleHasPeril(bundle, row) ? undefined : colorsV3.gray400}
        >
          {bundleHasPeril(bundle, row) ? <ThinTick /> : <>&mdash;</>}
        </PerilTableCell>
      ))}
    </AccordionRow>
  )
}

export const ComparisonTable = ({ bundles }: ComparisonTableProps) => {
  const uniquePerils = getUniquePerilsForQuoteBundles(bundles)

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
          {uniquePerils.map((row) =>
            isDesktop ? (
              <Accordion key={row.title} row={row} bundles={bundles} />
            ) : (
              <TableRow key={row.title}>
                <TableCell>{row.title}</TableCell>

                {bundles.map((bundle) => (
                  <TableCell
                    key={`${row.title}-${bundle.displayName}`}
                    align="center"
                    color={
                      bundleHasPeril(bundle, row) ? undefined : colorsV3.gray400
                    }
                  >
                    {bundleHasPeril(bundle, row) ? <ThinTick /> : <>&mdash;</>}
                  </TableCell>
                ))}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </>
  )
}
