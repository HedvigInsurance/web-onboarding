import animateScrollTo from 'animated-scroll-to'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { HEIGHT_AND_SCROLL_ANIMATION_TIME } from './Conversation'

export interface MessageProps<TId> {
  id: TId
  appear?: boolean
  delay?: number
  children: (props: { appear: boolean; id: TId }) => React.ReactNode
}

export class Message<TId> extends React.Component<MessageProps<TId>> {
  public render() {
    return (
      <Mount
        on={() =>
          this.props.appear ||
          setTimeout(
            () => animateScrollTo(document.body.scrollHeight),
            HEIGHT_AND_SCROLL_ANIMATION_TIME,
          )
        }
      >
        {this.props.children({
          appear: Boolean(this.props.appear),
          id: this.props.id,
        })}
      </Mount>
    )
  }
}
