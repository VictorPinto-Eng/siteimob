
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ImovelCard from '@/components/ImovelCard'
import ImovelFilters from '@/components/ImovelFilters'
import { getImoveis } from '@/lib/imoveis'

export const revalidate = 0 // Dynamic

export default async function ImoveisPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const minPrice = params.minPrice ? Number(params.minPrice) : undefined
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined

    const filters = {
        cidade: params.cidade as string,
        tipo: params.tipo as string,
        finalidade: params.finalidade as string,
        minPrice,
        maxPrice
    }

    const imoveis = await getImoveis(filters)

    return (
        <>
            <Header />
            <main style={{ padding: '2rem 0', minHeight: '80vh' }}>
                <div className="container">
                    <h1 style={{ marginBottom: '2rem' }}>Encontre seu imóvel</h1>

                    <ImovelFilters />

                    {imoveis.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--secondary)' }}>
                            <h3>Nenhum imóvel encontrado com esses filtros.</h3>
                            <p>Tente ajustar sua busca.</p>
                        </div>
                    ) : (
                        <div className="card-grid">
                            {imoveis.map(imovel => (
                                <ImovelCard key={imovel.id} imovel={imovel} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
