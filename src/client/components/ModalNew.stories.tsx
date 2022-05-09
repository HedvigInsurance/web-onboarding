import React, { useState } from 'react'
import { Story } from '@storybook/react'
import { colorsV3 } from '@hedviginsurance/brand'
import { Modal, ModalContent, ModalProps } from './ModalNew'
import { Button } from './buttons'
import { ThinTick } from './icons/ThinTick'
import { Table, TableHead, TableRow, TableBody, TableCell } from './Table/Table'
import { Headline } from './Headline/Headline'

export default {
  title: 'Components/ModalNew',
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story<ModalProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsModalOpen(!isModalOpen)}>Open modal</Button>
      <Modal
        {...args}
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          Some contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome contentSome contentSome contentSome contentSome
          contentSome content
        </ModalContent>
      </Modal>
    </>
  )
}

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

const TableTemplate: Story<ModalProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsModalOpen(!isModalOpen)}>Open modal</Button>
      <Modal
        {...args}
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <Headline
            textAlign="center"
            headingLevel="h2"
            colorVariant="dark"
            variant="s"
          >
            Vilket skydd passar dig?
          </Headline>
          <Table fullWidth mt="2rem">
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
          <Table fullWidth mt="2rem">
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
        </ModalContent>
      </Modal>
    </>
  )
}

export const WithTable = TableTemplate.bind({})
WithTable.args = {}
