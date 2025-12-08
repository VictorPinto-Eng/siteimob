
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getImovelById, Imovel } from '@/lib/imoveis'
import { getWhatsappLink } from '@/lib/whatsapp'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

export const revalidate = 60

export default async function ImovelDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const imovel = await getImovelById(id)

    if (!imovel) {
        notFound()
    }

    const priceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(imovel.preco_base)

    const cf = typeof imovel.custom_fields === 'string'
        ? {} // Should have been parsed in getImovelById helper, but typing allows string
        : imovel.custom_fields || {}

    const whatsappLink = getWhatsappLink(imovel.nome)

    let tags: string[] = []
    try {
        if (typeof imovel.tags === 'string') tags = JSON.parse(imovel.tags)
        else if (Array.isArray(imovel.tags)) tags = imovel.tags
    } catch { }

    // Check if we have any info to show in the grid
    const hasInfo = [cf.dormitorios, cf.banheiros, cf.vagas, cf.area_total, cf.tipo_imovel, cf.finalidade].some(Boolean)

    return (
        <>
            <Header />
            <main style={{ padding: '3rem 0', minHeight: '80vh' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem'
                    }}>
                        {/* Left: Image Gallery */}
                        <div>
                            <ImageGallery images={imovel.imagens_urls} alt={imovel.nome} />
                        </div>

                        {/* Right: Info */}
                        <div>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                    fontSize: '2rem',
                                    display: 'block',
                                    marginBottom: '0.5rem'
                                }}>
                                    {priceFormatted}
                                </span>
                                <h1 style={{ fontSize: '1.75rem', lineHeight: 1.3 }}>{imovel.nome}</h1>
                                <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                                    {[cf.bairro, cf.cidade].filter(Boolean).join(' - ')}
                                </p>
                            </div>

                            {tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {tags.map(t => (
                                        <span key={t} style={{
                                            backgroundColor: '#e2e8f0',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.9rem',
                                            color: '#475569'
                                        }}>{t}</span>
                                    ))}
                                </div>
                            )}

                            {hasInfo && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    marginBottom: '2rem',
                                    backgroundColor: 'white',
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius)',
                                    border: '1px solid var(--border)'
                                }}>
                                    <InfoItem label="Dormitórios" value={cf.dormitorios} />
                                    <InfoItem label="Banheiros" value={cf.banheiros} />
                                    <InfoItem label="Vagas" value={cf.vagas} />
                                    <InfoItem label="Área" value={cf.area_total ? `${cf.area_total} m²` : null} />
                                    <InfoItem label="Tipo" value={cf.tipo_imovel} />
                                    <InfoItem label="Finalidade" value={cf.finalidade} />
                                </div>
                            )}

                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Sobre o imóvel</h3>
                                <div style={{ lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                                    {imovel.descricao}
                                </div>
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsaapp"
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                            >
                                Falar no WhatsApp sobre este imóvel
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

function InfoItem({ label, value }: { label: string, value: any }) {
    if (!value) return null
    return (
        <div>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>{label}</span>
            <span style={{ fontWeight: 600 }}>{value}</span>
        </div>
    )
}
