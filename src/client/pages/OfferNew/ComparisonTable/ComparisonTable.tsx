import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
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

type ComparisonTableProps = {
  bundles: QuoteBundle[]
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
          ))}
        </TableBody>
      </Table>
    </>
  )
}
