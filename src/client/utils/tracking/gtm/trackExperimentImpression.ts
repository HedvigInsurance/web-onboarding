import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'

export const trackExperimentImpression = (
  experimentId: string,
  variant: number,
) => {
  pushToGTMDataLayer({
    event: 'experiment_impression',
    eventData: {
      experiment_id: experimentId,
      variant_id: `${experimentId}.${variant}`,
    },
  })
}
