import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ImovelCard from '@/components/ImovelCard'
import { getFeaturedImoveis } from '@/lib/imoveis'
import { getWhatsappLink } from '@/lib/whatsapp'
import Link from 'next/link'
import styles from './home.module.css'

export const revalidate = 0 // Disable caching (Dynamic)

export default async function Home() {
    const featured = await getFeaturedImoveis()

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.badge}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                color="var(--primary)"
                            >
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                            Os melhores imóveis da região
                        </div>

                        <h1 className={styles.title}>
                            Encontre o <span className={styles.highlight}>imóvel ideal</span>
                            <br />
                            para você
                        </h1>

                        <p className={styles.subtitle}>Especializado em imóveis residenciais e comerciais</p>

                        <p className={styles.subtitle}>
                            Casas e apartamentos para venda e locação nas melhores localizações. Atendimento
                            personalizado via WhatsApp.
                        </p>

                        <div className={styles.buttons}>
                            <Link href="/imoveis" className={`btn btn-primary ${styles.buttonLink}`}>
                                Ver todos os imóveis &rarr;
                            </Link>

                            <a
                                href={getWhatsappLink('Atendimento Geral')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn ${styles.whatsappButton}`}
                            >
                                Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className={styles.benefitsSection}>
                    <div className="container">
                        <div className={styles.benefitsGrid}>
                            <div className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                                    </svg>
                                </div>
                                <h3 className={styles.benefitTitle}>Imóveis selecionados</h3>
                                <p className={styles.benefitText}>Curadoria de imóveis nas melhores localizações</p>
                            </div>

                            <div className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <h3 className={styles.benefitTitle}>Segurança</h3>
                                <p className={styles.benefitText}>Documentação verificada e processo transparente</p>
                            </div>

                            <div className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </div>
                                <h3 className={styles.benefitTitle}>Atendimento VIP</h3>
                                <p className={styles.benefitText}>Suporte dedicado via WhatsApp em todas as etapas</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Section */}
                <section className={styles.featuredSection}>
                    <div className="container">
                        <div className={styles.featuredHeader}>
                            <div>
                                <h2 className={styles.featuredTitle}>Imóveis em destaque</h2>
                                <p className={styles.featuredSubtitle}>Conheça nossas melhores oportunidades</p>
                            </div>
                            <Link href="/imoveis" className={`btn ${styles.viewAllButton}`}>
                                Ver todos &rarr;
                            </Link>
                        </div>

                        {featured.length === 0 ? (
                            <p>Nenhum imóvel em destaque no momento.</p>
                        ) : (
                            <div className="card-grid">
                                {featured.map((imovel) => (
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
