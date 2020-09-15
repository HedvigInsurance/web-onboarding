import { MemberQuery } from 'data/graphql'

export const handleSignedEvent = (member: MemberQuery['member'] | null) => {
  const message = JSON.stringify({
    event: 'Signed',
    payload: { memberId: member?.id },
  })
  window.frames.parent.postMessage(message, '*')
}
