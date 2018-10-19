import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import { Size, Spacing } from 'components/utils/Spacing'
import * as React from 'react'
import styled from 'react-emotion'

const Wrapper = styled('div')(({ hidden }: { hidden: boolean }) => ({
  position: 'relative',
  // Hide but don't disable button
  ...(hidden
    ? {
        width: 0,
        height: 0,
        overflow: 'hidden',
      }
    : {}),
}))

const AbsoluteSpacing = styled(Spacing)({
  position: 'absolute',
  right: 0,
  top: 0,
})

export const NextButton: React.SFC<{
  disabled?: boolean
  hidden?: boolean
}> = ({ disabled, hidden }) => (
  <Wrapper hidden={Boolean(hidden)}>
    <AbsoluteSpacing marginTop={Size.LG}>
      <FadeIn>
        <Button
          background={colors.PURPLE}
          foreground={colors.WHITE}
          disabled={disabled}
          type="submit"
        >
          <TranslationsConsumer textKey="CHAT_INPUT_NEXT_LABEL">
            {(text) => text}
          </TranslationsConsumer>
        </Button>
      </FadeIn>
    </AbsoluteSpacing>
  </Wrapper>
)
