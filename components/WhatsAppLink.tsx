'use client'

import React from 'react'

const DEFAULT_WHATSAPP_PHONE = '5511999999999'

function sanitizePhone(phone: string) {
    return (phone || '').replace(/\D/g, '')
}

function isMobileUA(ua: string) {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua)
}

type Props = {
    messageOrImovel: string
    isFullMessage?: boolean
    className?: string
    style?: React.CSSProperties
    title?: string
    children: React.ReactNode
}

export default function WhatsAppLink({
    messageOrImovel,
    isFullMessage = false,
    className,
    style,
    title,
    children,
}: Props) {
    const phone = sanitizePhone(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE)

    const text = isFullMessage
        ? messageOrImovel
        : `Vim pelo site, quero o imóvel ${messageOrImovel}`

    const encoded = encodeURIComponent(text)

    // SSR-safe default (desktop/intermediária)
    const desktopUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`

    // Mobile (mais direto)
    const mobileUrl = `https://wa.me/${phone}?text=${encoded}`

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
        if (isMobileUA(ua)) {
            e.preventDefault()
            window.open(mobileUrl, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <a
            href={desktopUrl}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            style={style}
            title={title}
        >
            {children}
        </a>
    )
}
