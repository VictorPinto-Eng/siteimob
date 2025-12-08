export function getWhatsappLink(messageOrImovel: string) {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5511999999999'
    const text = messageOrImovel.startsWith('Vim')
        ? messageOrImovel
        : `Vim pelo site, quero o imóvel ${messageOrImovel}`

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
