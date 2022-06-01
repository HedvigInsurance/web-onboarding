import React from 'react'
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
import { BREAKPOINTS } from 'utils/mediaQueries'
import {
  AccordionItem,
  AccordionTrigger,
  Accordion,
  AccordionContent,
  AccordionTriggerIcon,
} from 'components/Accordion/Accordion'

type ComparisonTableProps = {
  bundles: QuoteBundle[]
}

const TitleTableCell = styled(TableCell)`
  width: 100%;
`

const StyledAccordionContent = styled(AccordionContent)({
  fontSize: '0.875rem',
  color: colorsV3.gray700,
})

const PerilTableCell = styled(TableCell)`
  vertical-align: top;
`

export const ComparisonTable = ({ bundles }: ComparisonTableProps) => {
  const uniquePerils = getUniquePerilsForQuoteBundles(bundles)
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumScreen })

  return (
    <Accordion mode="single">
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
            <TableRow key={row.title}>
              <TitleTableCell>
                <AccordionItem>
                  <AccordionTrigger disabled={!isDesktop}>
                    {row.title}
                    {isDesktop && <AccordionTriggerIcon />}
                  </AccordionTrigger>
                  <StyledAccordionContent>
                    <p>{row.description}</p>
                  </StyledAccordionContent>
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
    </Accordion>
  )
}
