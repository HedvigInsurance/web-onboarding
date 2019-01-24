import * as React from 'react'
import { Session } from './DontPanic'

const HEDVIG_ICON_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAACiCAYAAACKwQmbAAAACXBIWXMAAC4jAAAuIwF4pT92AAAGaGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDktMjdUMTM6MjE6MTQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTIyVDExOjQ5OjAyKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAxLTIyVDExOjQ5OjAyKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3N2EwNzk2LTZhYmMtNGU1OC04ZDJhLWEyOWNhOWQ1YmZhZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjcyZDI4ZjFhLWUwYzgtODk0Yi04Mjk5LTkwYjdmZTk3ZmNlYiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQwZGM5MjhiLWY5YmUtNGQ4OS1hYzExLTQxMTE0ZjAxMDIwNCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDBkYzkyOGItZjliZS00ZDg5LWFjMTEtNDExMTRmMDEwMjA0IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTI3VDEzOjIxOjE0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NzdhMDc5Ni02YWJjLTRlNTgtOGQyYS1hMjljYTlkNWJmYWYiIHN0RXZ0OndoZW49IjIwMTktMDEtMjJUMTE6NDk6MDIrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrPk24EAAANuSURBVHja7d29bdtAGAZgbhD1AQICWcAjsE+jEdikVx2kYJ1GI2gEdWk5AkdQnYojMDRwdmQjtoXEvDsenxd4K/+KD3g6yh/lapqmSsutg7AV4A/Vt2nJVhI1gAEDBgwYMGDAAlgAC2DAgAEDBgwYsAAWwAIYMGDAgAEDBiyABbAAFsCAAQMGDBgwYAEsgAUwYMCAAQMGDFgAC2ABDBgwYMCAAQMGDFgAC2ApGvjrp+lubjP3MLcL7d/ow+cdwtfeAc4AOGDeo5zmDnOnd+4QvvdhjeirA54Pch0O9nnuuADoWx3Dz77/HWrA7wB8hTokAL3lDM8WO2vg+aDtw9kyraT3v+se8Ouou7nt3MuKYJ/3Eh7DDvBT2C7R8+qSz9ddSugsgAs4Y286ozcHHK43h4Jh/7Yha4oHDsvxcUOwz3uMtWxHBw5n7WXDuNfLdlMisD5tB7j89kst2YDzuqS6A1w+cgu4/LaAIQOGDLh4ZMCFIwNeTxvArpMBF/DXqB3gsnsC/OevNecwUdGE7l6YJHn4eBdGZC+lbLpKAz6H6ZD/nnAMk5xtpkN/462PsQTgYekBt6tBwJymT/rSgfvY4y9XY0b9WpbqNQJfUsC+AH3JYKnelQTcVZklbMySzneVADzkfONXuAEu5fNzvWbgUw53CNy4ETvldm2cO/BxbbdrJhwHrtcG3FYrTbikyuIszhV4tbiJkes1AHdVIUmwwz7mDnyqCkvkjdeYM/Cwht3yP+6uh1SvbuUCPH4t5F1tXrlOjnXf8zlH4ENVeML7eMQ6i3c5AQ/VRhJxqW5zAm42BNzEXqZTA5+rjSXWAEEuwPUGgeuYY7Ypgftqo4k0MNClBt5vGHgfa6QnFfBYbTwRrovHlMAnwFFewqxTAe8BR1mmmyTAlTwgL77RSgHco422mz6mAD6ifQReerynTwHcon0EbksEbtBGe216TAFco433sqX/m1T4Thrw1oC/fP4+LVmkiYGnH/O18YJF+jQff/2clixgwIABAwYMGDBgwIABAwYMGDBgwIABAxbAgAEDBgwYMGDAgAEDFsCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQtgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABA147sBZZB6Hw/ga/zzPixbCPwwAAAABJRU5ErkJggg=='

export class Notifier extends React.Component<{
  chatMessages: Session['chatMessages']
}> {
  public static defaultProps = {
    chatMessages: [],
  }
  public componentDidMount(): void {
    if (!('Notification' in window) || Notification.permission === 'granted') {
      return
    }

    Notification.requestPermission()
  }

  public componentWillReceiveProps(
    nextProps: Readonly<{ chatMessages: Session['chatMessages'] }>,
  ): void {
    const notificationAudio = new Audio(
      '/new-member-assets/audio/notification.mp3',
    )
    notificationAudio.volume = 0.3
    if (!nextProps.chatMessages) {
      return
    }

    const existingMessageIds = this.props.chatMessages.map(({ id }) => id)
    const newMessages = nextProps.chatMessages.filter(
      ({ id }) => !existingMessageIds.includes(id),
    )
    window.setTimeout(() => {
      if (newMessages.map(({ isHedvig }) => isHedvig).includes(true)) {
        if (
          !('Notification' in window) ||
          Notification.permission !== 'granted' ||
          document.hasFocus()
        ) {
          notificationAudio.play()
          return
        }
        const lastMessage = [...newMessages]
          .reverse()
          .find(({ isHedvig }) => isHedvig)
        // tslint:disable-next-line no-unused-expression
        new Notification('Nytt meddelande från hedvig', {
          silent: true,
          body: lastMessage && lastMessage.text,
          icon: HEDVIG_ICON_PNG,
        })
      }
    }, 1800)
  }

  public render() {
    return null
  }
}
