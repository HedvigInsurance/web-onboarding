import { Environment, HAnalyticsProvider } from "@hedviginsurance/hanalytics-client"
import uuid from "uuid"
import { CookieStorage } from 'cookie-storage'

import React, { useState } from "react"
import { useCurrentLocale } from "../../l10n/useCurrentLocale"
import { useStorage } from "../StorageContainer"
import { DEVICE_ID_KEY } from '../../../shared/sessionStorage'

interface HAnalyticsWrapperProps {
    children: React.ReactNode
}

export const HAnalyticsWrapper = (props: HAnalyticsWrapperProps) => {
    const locale = useCurrentLocale()
    const environment = window.hedvigClientConfig.appEnvironment
    const storageState = useStorage()
    const [sessionID] = useState(uuid.v1())

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

    const cookieStorage = new CookieStorage()

    return (
        <HAnalyticsProvider
        getConfig={() => ({
            httpHeaders: {
                Authorization: getAuthorizationHeader()
            },
            environment: Environment.STAGING,
            userAgent: navigator.userAgent,
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
                    id: cookieStorage.getItem(DEVICE_ID_KEY) ?? ""
                },
            },
            onSend: () => {
                /// send to google analytics or other tracking partner here
            }
        })}
        bootstrapExperiments={[]}
    >
        {props.children}
    </HAnalyticsProvider>
    )
}