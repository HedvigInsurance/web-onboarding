import React from 'react'
import { Story } from '@storybook/react'
import { colorsV3 } from '@hedviginsurance/brand'
import { ThinTick } from '../icons/ThinTick'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
} from './Table'

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
  args: {
    minWidth: '650px',
  },
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const Template: Story<TableProps> = (args) => (
  <Table {...args}>
    <TableHead>
      <TableRow>
        <TableCell>Dessert (100g serving)</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat&nbsp;(g)</TableCell>
        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
        <TableCell align="right">Protein&nbsp;(g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export const Default = Template.bind({})
Default.args = {}

function createDataCarInsuranceData(
  name: string,
  traffic: boolean,
  half: boolean,
  full: boolean,
) {
  return { name, traffic, half, full }
}

const comparisonRows = [
  createDataCarInsuranceData('Personskador', true, true, true),
  createDataCarInsuranceData('Skador på annans egendom', true, true, true),
  createDataCarInsuranceData('Stöld och inbrott', false, true, true),
  createDataCarInsuranceData('Brand', false, true, true),
  createDataCarInsuranceData('Glasskador', false, true, true),
  createDataCarInsuranceData('Bärgning', false, true, true),
  createDataCarInsuranceData('Skador på bilen från olycka', false, false, true),
]

const premiumRows = [
  createDataCarInsuranceData('Personskador', false, true, true),
  createDataCarInsuranceData('Skador på annans egendom', false, true, true),
]

const ComparisonTemplate: Story<TableProps> = (args) => (
  <>
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">Trafik</TableCell>
          <TableCell align="center">Halv</TableCell>
          <TableCell align="center">Hel</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {comparisonRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell
              align="center"
              color={row.traffic ? undefined : colorsV3.gray300}
            >
              {row.traffic ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.half ? undefined : colorsV3.gray300}
            >
              {row.half ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.full ? undefined : colorsV3.gray300}
            >
              {row.full ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Table {...args} mt="2rem">
      <TableHead>
        <TableRow>
          <TableCell>ENDAST MED PREMIUM</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {premiumRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell
              align="center"
              color={row.traffic ? undefined : colorsV3.gray300}
            >
              {row.traffic ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.half ? undefined : colorsV3.gray300}
            >
              {row.half ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.full ? undefined : colorsV3.gray300}
            >
              {row.full ? <ThinTick /> : <>&mdash;</>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
)

export const ComparisonTable = ComparisonTemplate.bind({})
ComparisonTable.args = {}
