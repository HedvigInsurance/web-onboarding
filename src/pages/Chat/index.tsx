import * as React from 'react'
import { ChatMessage } from '../../components/hedvig/ChatMessage'
import { TimedMount } from '../../utils/TimedMount'
import { FadeIn, FadeUp } from '../../components/animations/appearings'

export const Chat: React.SFC = () => (
  <div>
    <div>
      <ChatMessage typingDuration={1000}>
        Hej! Det är jag som är Hedvig 👋{' '}
      </ChatMessage>
    </div>
    <TimedMount duration={1000}>
      {({ hasFired }) =>
        hasFired && (
          <>
            <div>
              <ChatMessage typingDuration={1000}>
                Berätta lite om dig själv...
              </ChatMessage>
            </div>

            <TimedMount duration={1500}>
              {({ hasFired }) =>
                hasFired && (
                  <FadeIn>
                    <FadeUp>
                      <div>
                        Jag heter <input type="text" />
                      </div>
                      <div>
                        Jag är <input type="number" pattern="\d+" /> år gammal
                      </div>
                    </FadeUp>
                  </FadeIn>
                )
              }
            </TimedMount>
          </>
        )
      }
    </TimedMount>
  </div>
)
