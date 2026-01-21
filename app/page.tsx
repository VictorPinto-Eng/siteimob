
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ImovelCard from '@/components/ImovelCard'
import { getFeaturedImoveis } from '@/lib/imoveis'
import { getWhatsappLink } from '@/lib/whatsapp'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every minute

export default async function Home() {
    const featured = await getFeaturedImoveis()

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section style={{
                    padding: '6rem 0',
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom, #ffffff, #f8fafc)'
                }}>
                    <div className="container">
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            color: 'var(--secondary)'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" color="var(--primary)"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                            Os melhores imóveis da região
                        </div>

                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            color: 'var(--foreground)',
                            maxWidth: '800px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Encontre o <span style={{ color: 'var(--primary)' }}>imóvel ideal</span><br />
                            para você
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--secondary)',
                            marginBottom: '2.5rem',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem',
                            lineHeight: 1.6
                        }}>
                            Especializado em imóveis residenciais e comerciais
                        </p>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--secondary)',
                            marginBottom: '2.5rem',
                            maxWidth: '600px',
                            margin: '0 auto 2.5rem',
                            lineHeight: 1.6
                        }}>
                            Casas e apartamentos para venda e locação nas melhores localizações. Atendimento personalizado via WhatsApp.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link href="/imoveis" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                                Ver todos os imóveis &rarr;
                            </Link>
                            <a href={getWhatsappLink('Atendimento Geral')} target="_blank" className="btn" style={{
                                backgroundColor: 'white',
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)',
                                padding: '0.875rem 2rem',
                                fontSize: '1rem'
                            }}>
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section style={{ padding: '4rem 0', background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                                <div style={{
                                    width: '3rem', height: '3rem', background: '#ecfdf5', borderRadius: '0.75rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Imóveis selecionados</h3>
                                <p style={{ color: 'var(--secondary)' }}>Curadoria de imóveis nas melhores localizações</p>
                            </div>
                            <div style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                                <div style={{
                                    width: '3rem', height: '3rem', background: '#ecfdf5', borderRadius: '0.75rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Segurança</h3>
                                <p style={{ color: 'var(--secondary)' }}>Documentação verificada e processo transparente</p>
                            </div>
                            <div style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                                <div style={{
                                    width: '3rem', height: '3rem', background: '#ecfdf5', borderRadius: '0.75rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Atendimento VIP</h3>
                                <p style={{ color: 'var(--secondary)' }}>Suporte dedicado via WhatsApp em todas as etapas</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Section */}
                <section style={{ padding: '6rem 0' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Imóveis em destaque</h2>
                                <p style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>Conheça nossas melhores oportunidades</p>
                            </div>
                            <Link href="/imoveis" className="btn" style={{ border: '1px solid var(--border)', background: 'white' }}>
                                Ver todos &rarr;
                            </Link>
                        </div>

                        {featured.length === 0 ? (
                            <p>Nenhum imóvel em destaque no momento.</p>
                        ) : (
                            <div className="card-grid">
                                {featured.map(imovel => (
                                    <ImovelCard key={imovel.id} imovel={imovel} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
