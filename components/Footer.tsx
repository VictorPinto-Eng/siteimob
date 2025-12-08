
export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            backgroundColor: 'white',
            padding: '2rem 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--secondary)' }}>
                <p>&copy; {new Date().getFullYear()} Imobiliária. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}
