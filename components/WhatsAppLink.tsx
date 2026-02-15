'use client'

import React from 'react'

const DEFAULT_WHATSAPP_PHONE = '5511999999999'

function sanitizePhone(phone: string) {
    return (phone || '').replace(/\D/g, '')
}

function isMobile() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export default function WhatsAppLink({
    messageOrImovel,
    isFullMessage = false,
    className,
    style,
    children,
}: {
    messageOrImovel: string
    isFullMessage?: boolean
    className?: string
    style?: React.CSSProperties
    children: React.ReactNode
}) {
    const phone = sanitizePhone(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE)

    const text = isFullMessage
        ? messageOrImovel
        : `Vim pelo site, quero o imóvel ${messageOrImovel}`

    const encoded = encodeURIComponent(text)

    // Mobile: mais direto
    const mobileUrl = `https://wa.me/${phone}?text=${encoded}`

    // Desktop: tela intermediária com opção Web
    const desktopUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`

    const href = isMobile() ? mobileUrl : desktopUrl

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
            {children}
        </a>
    )
}
