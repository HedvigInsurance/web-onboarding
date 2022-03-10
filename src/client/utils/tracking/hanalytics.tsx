import { hAnalyticsNetworking, HAnalyticsProvider } from "@hedviginsurance/hanalytics-client"
import React, { useState } from "react"
import { useCurrentLocale } from "../../l10n/useCurrentLocale"
import { useStorage } from "../StorageContainer"
import uuid from "uuid"

interface HAnalyticsWrapperProps {
    children: React.ReactNode
}

export const HAnalyticsWrapper = (props: HAnalyticsWrapperProps) => {
    const locale = useCurrentLocale()
    const environment = window.hedvigClientConfig.appEnvironment
    const storageState = useStorage()
    const [sessionID, setSessionID] = useState(uuid.v1())

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

    return (
        <HAnalyticsProvider
        getConfig={() => ({
            httpHeaders: {
                Authorization: getAuthorizationHeader()
            },
            endpointURL: "https://hanalytics-staging.herokuapp.com", // todo resolve correct endpoint
            context: {
                locale: locale.isoLocale,
                app: {
                    name: "WebOnboarding",
                    namespace: environment,
                    version: "1.0.0",
                    build: "3000"
                },
                session: {
                    id: sessionID
                },
                device: {
                    id: "THE_DEVICE_ID"
                }
            },
            onSend: (event) => {
                /// send to google analytics or other tracking partner here
            }
        })}
        bootstrapExperiments={[]}
    >
        {props.children}
    </HAnalyticsProvider>
    )
}