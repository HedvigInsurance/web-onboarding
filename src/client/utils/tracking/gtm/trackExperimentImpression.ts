import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'
import { EventName } from 'utils/tracking/gtm/types'

export const trackExperimentImpression = (
  experimentId: string,
  variant: number,
) => {
  pushToGTMDataLayer({
    event: EventName.ExperimentImpression,
    eventData: {
      experiment_id: experimentId,
      variant_id: `${experimentId}.${variant}`,
    },
  })
}
