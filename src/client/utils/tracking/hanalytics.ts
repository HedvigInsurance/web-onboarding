import { hAnalyticsNetworking, hAnalyticsTrackers } from "@hedviginsurance/hanalytics-client"
import { useEffect } from "react"
import { useCurrentLocale } from "../../l10n/useCurrentLocale"
import { useStorage } from "../StorageContainer"

export const useHAnalytics = () => {
    const locale = useCurrentLocale()
    const environment = window.hedvigClientConfig.appEnvironment
    const storageState = useStorage()

    const getAuthorizationHeader = () => {
        if (!storageState) {
            return ""
        }

        const sessionToken = storageState.session?.getSession()?.token

        if (sessionToken) {
            return `Bearer ${sessionToken}`
        }

        return ""
    }
    
    useEffect(() => {
        hAnalyticsNetworking.getConfig = () =>
           ({
                httpHeaders: {
                    Authorization: getAuthorizationHeader()
                },
                endpointURL: "https://hanalytics-production.herokuapp.com", // todo resolve correct endpoint
                context: {
                    locale: locale.isoLocale,
                    app: {
                        name: "WebOnboarding",
                        namespace: environment,
                        version: "1.0.0",
                        build: "3000"
                    },
                    device: {
                        id: "THE_DEVICE_ID"
                    }
                },
                onSend: (event) => {
                    /// send to google analytics or other tracking partner here
                }
            })

        console.log("hello from useHAnalytics")
        
        hAnalyticsTrackers.identify()
    }, [locale, environment, storageState])
}