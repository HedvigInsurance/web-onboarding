import * as React from 'react'

export interface MessageProps<TId> {
  id: TId
  appear?: boolean
  delay?: number
  children: (props: { appear: boolean; id: TId }) => React.ReactNode
}

export class Message<TId> extends React.Component<MessageProps<TId>> {
  public render() {
    return (
      <>
        {this.props.children({
          appear: Boolean(this.props.appear),
          id: this.props.id,
        })}
      </>
    )
  }
}
