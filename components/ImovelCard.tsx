
import Link from 'next/link'
import styles from './ImovelCard.module.css'
import { Imovel } from '@/lib/imoveis'
import { getWhatsappLink } from '@/lib/whatsapp'

interface ImovelCardProps {
    imovel: Imovel
}

export default function ImovelCard({ imovel }: ImovelCardProps) {
    const { nome, preco_base, custom_fields, imagens_urls } = imovel

    // Format price
    const priceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco_base)

    // Location logic (safe access)
    const cf = typeof custom_fields === 'string' ? {} : custom_fields
    const location = [cf.bairro, cf.cidade].filter(Boolean).join(' - ')

    // Helper for WhatsApp
    const whatsappLink = getWhatsappLink(nome)

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={imagens_urls[0]} alt={nome} className={styles.image} loading="lazy" />
                <div className={styles.badges}>
                    <span className={`${styles.badge} ${styles[imovel.tipo.toLowerCase()] || ''}`}>{imovel.tipo}</span>
                    <span className={`${styles.badge} ${styles.deal}`}>{cf.finalidade}</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.price}>{priceFormatted}</div>
                <h3 className={styles.title}>{nome}</h3>
                {location && <p className={styles.location}>{location}</p>}

                <div className={styles.features}>
                    {cf.dormitorios && (
                        <span className={styles.feature}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
                            {cf.dormitorios} dorm
                        </span>
                    )}
                    {cf.banheiros && (
                        <span className={styles.feature}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1.5C3.5 1 2 2.5 2 5v14h20v-5.5" /><path d="M6 16v3" /><path d="M20 16v3" /></svg>
                            {cf.banheiros} ban
                        </span>
                    )}
                    {cf.vagas && (
                        <span className={styles.feature}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 17V7h6v10" /></svg>
                            {cf.vagas} vaga
                        </span>
                    )}
                    {cf.area_total && (
                        <span className={styles.feature}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z" /></svg>
                            {cf.area_total} m²
                        </span>
                    )}
                </div>

                <div className={styles.footer}>
                    <Link href={`/imovel/${imovel.id}`} className={styles.detailsLink}>
                        Ver detalhes
                    </Link>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${styles.whatsappButton}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        </article>
    )
}
