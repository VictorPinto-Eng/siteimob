
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ImovelFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState({
        cidade: searchParams.get('cidade') || '',
        tipo: searchParams.get('tipo') || '',
        finalidade: searchParams.get('finalidade') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (filters.cidade) params.set('cidade', filters.cidade)
        if (filters.tipo) params.set('tipo', filters.tipo)
        if (filters.finalidade) params.set('finalidade', filters.finalidade)
        if (filters.minPrice) params.set('minPrice', filters.minPrice)
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
        router.push(`/imoveis?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Cidade</label>
                <input
                    type="text"
                    name="cidade"
                    placeholder="Ex: Campinas"
                    value={filters.cidade}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Tipo</label>
                <select
                    name="tipo"
                    value={filters.tipo}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                >
                    <option value="">Todos</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                </select>
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Finalidade</label>
                <select
                    name="finalidade"
                    value={filters.finalidade}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                >
                    <option value="">Todas</option>
                    <option value="venda">Venda</option>
                    <option value="locacao">Locação</option>
                </select>
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Preço Mín.</label>
                <input
                    type="number"
                    name="minPrice"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Preço Máx.</label>
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="0"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Filtrar
                </button>
            </div>
        </form>
    )
}
