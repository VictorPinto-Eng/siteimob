
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header style={{
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '4rem'
            }}>
                <Link href="/" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
                    <Image
                        src="/LOGO_HV5.png"
                        alt="Soluções Imobiliárias Logo"
                        width={90}
                        height={65}
                        style={{ objectFit: 'contain' }}
                    />
                    Soluções Imobiliárias
                </Link>

                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
                    <Link href="/imoveis" style={{ fontWeight: 500 }}>Imóveis</Link>
                    <Link href="/contato" style={{ fontWeight: 500 }}>Contato</Link>
                </nav>
            </div>
        </header>
    )
}
