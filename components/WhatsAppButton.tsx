'use client'

import React, { useEffect, useRef, useState } from 'react'

const DEFAULT_WHATSAPP_PHONE = '5511999999999'

function sanitizePhone(phone: string) {
    return (phone || '').replace(/\D/g, '')
}

export default function WhatsAppButton({
    messageOrImovel,
    isFullMessage = false,
    className,
    children = 'Falar no WhatsApp',
}: {
    messageOrImovel: string
    isFullMessage?: boolean
    className?: string
    children?: React.ReactNode
}) {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const phone = sanitizePhone(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE)

    const text = isFullMessage
        ? messageOrImovel
        : `Vim pelo site, quero o imóvel ${messageOrImovel}`

    const encoded = encodeURIComponent(text)

    const appLink = `whatsapp://send?phone=${phone}&text=${encoded}`
    const webLink = `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`

    // fecha ao clicar fora
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return
            if (!wrapperRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onDocClick)
        return () => document.removeEventListener('mousedown', onDocClick)
    }, [])

    const onMainClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen((v) => !v)
    }

    const openApp = () => {
        setOpen(false)
        window.location.href = appLink
    }

    const openWeb = () => {
        setOpen(false)
        window.open(webLink, '_blank', 'noopener,noreferrer')
    }

    return (
        <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
            <a href={webLink} onClick={onMainClick} className={className} rel="noopener noreferrer">
                {children}
            </a>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        minWidth: 220,
                        padding: 10,
                        borderRadius: 12,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        background: 'white',
                        zIndex: 9999,
                    }}
                >
                    <div style={{ display: 'grid', gap: 8 }}>
                        <button
                            type="button"
                            onClick={openApp}
                            style={{
                                padding: '10px 12px',
                                borderRadius: 10,
                                border: '1px solid rgba(0,0,0,0.12)',
                                background: 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            Abrir no aplicativo
                        </button>

                        <button
                            type="button"
                            onClick={openWeb}
                            style={{
                                padding: '10px 12px',
                                borderRadius: 10,
                                border: '1px solid rgba(0,0,0,0.12)',
                                background: 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            Abrir no WhatsApp Web
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
