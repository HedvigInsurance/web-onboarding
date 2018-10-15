import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import { Button } from 'components/buttons'
import { Size, Spacing } from 'components/utils/Spacing'
import * as React from 'react'

export const NextButton = () => (
  <Spacing marginTop={Size.LG}>
    <FadeIn>
      <Button
        background={colors.PURPLE}
        foreground={colors.WHITE}
        type="submit"
      >
        <TranslationsConsumer textKey="CHAT_INPUT_NEXT_LABEL">
          {(text) => text}
        </TranslationsConsumer>
      </Button>
    </FadeIn>
  </Spacing>
)
