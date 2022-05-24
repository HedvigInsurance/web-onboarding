import React, { useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
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

type ComparisonTableProps = {
  bundles: QuoteBundle[]
}

type AccordionProps = {
  bundles: QuoteBundle[]
  row: PerilV2
}

const RowTitle = styled.div`
  font-size: 1rem;
`

const RowDescription = styled.p`
  font-size: 0.875rem;
  color: ${colorsV3.gray700};
`

const Accordion = ({ bundles, row }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <TableRow key={row.title} onClick={() => setIsActive(!isActive)}>
      <TableCell>
        <RowTitle>{row.title}</RowTitle>
        {isActive && <RowDescription>{row.description}</RowDescription>}
      </TableCell>
      {bundles.map((bundle) => (
        <TableCell
          key={`${row.title}-${bundle.displayName}`}
          align="center"
          color={bundleHasPeril(bundle, row) ? undefined : colorsV3.gray400}
        >
          {bundleHasPeril(bundle, row) ? <ThinTick /> : <>&mdash;</>}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const ComparisonTable = ({ bundles }: ComparisonTableProps) => {
  const uniquePerils = getUniquePerilsForQuoteBundles(bundles)

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
          {uniquePerils.map((row) => (
            <Accordion key={row.title} row={row} bundles={bundles} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
