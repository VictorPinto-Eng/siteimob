const DEFAULT_WHATSAPP_PHONE = '5511999999999'

export function getWhatsappLink(messageOrImovel: string, isFullMessage: boolean = false) {
    const phone =
        process.env.NEXT_PUBLIC_WHATSAPP_PHONE || DEFAULT_WHATSAPP_PHONE
    const text = isFullMessage ? messageOrImovel : `Vim pelo site, quero o imóvel ${messageOrImovel}`
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
