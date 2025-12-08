
import Link from 'next/link'

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
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                    Imobiliária
                </Link>

                <nav style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
                    <Link href="/imoveis" style={{ fontWeight: 500 }}>Imóveis</Link>
                </nav>
            </div>
        </header>
    )
}
