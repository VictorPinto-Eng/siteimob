
import { supabase } from './supabaseClient'

// Types
export interface ImovelCustomFields {
    tipo_imovel?: 'casa' | 'apartamento' | string
    finalidade?: 'venda' | 'locacao' | string
    dormitorios?: number
    banheiros?: number
    vagas?: number
    area_total?: number
    cidade?: string
    estado?: string
    bairro?: string
    [key: string]: any
}

export interface Imovel {
    id: string
    organization_id: string
    nome: string
    tipo: string
    categoria: string
    preco_base: number
    descricao: string
    ativo: boolean
    status: string
    tags: string // JSON string array
    custom_fields: ImovelCustomFields // JSON string or object
    imagens_urls: string[]
}

export interface ImovelFilters {
    cidade?: string
    tipo?: string
    finalidade?: string
    minPrice?: number
    maxPrice?: number
}

// Helpers
function parseImovel(item: any): Imovel {
    let custom_fields = item.custom_fields
    if (typeof custom_fields === 'string') {
        try {
            custom_fields = JSON.parse(custom_fields)
        } catch {
            custom_fields = {}
        }
    }

    let imagens_urls: string[] = []
    if (typeof item.imagens_urls === 'string') {
        imagens_urls = item.imagens_urls.split('\n').map((url: string) => url.trim()).filter(Boolean)
    } else if (Array.isArray(item.imagens_urls)) {
        imagens_urls = item.imagens_urls
    }

    return {
        ...item,
        imagens_urls,
        custom_fields: custom_fields || {}
    }
}

function parseImoveis(data: any[]): Imovel[] {
    return data.map(parseImovel)
}

// Data Fetching
export async function getFeaturedImoveis(limit = 6) {
    const { data, error } = await supabase
        .from('produtos_servicos')
        .select('*')
        .eq('tipo', 'produto')
        .eq('categoria', 'Imovel')
        .eq('status', 'ativo')
        .eq('ativo', true)
        .limit(limit)

    if (error) {
        console.error('Error fetching featured imoveis:', error)
        return []
    }

    return parseImoveis(data)
}

export async function getImoveis(filters: ImovelFilters = {}) {
    let query = supabase
        .from('produtos_servicos')
        .select('*')
        .eq('tipo', 'produto')
        .eq('categoria', 'Imovel')
        .eq('status', 'ativo')
        .eq('ativo', true)

    if (filters.minPrice) {
        query = query.gte('preco_base', filters.minPrice)
    }
    if (filters.maxPrice) {
        query = query.lte('preco_base', filters.maxPrice)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching imoveis:', error)
        return []
    }

    const parsed = parseImoveis(data)

    // In-memory filtering for JSON fields
    return parsed.filter(imovel => {
        const fields = imovel.custom_fields
        if (typeof fields === 'string') return false

        if (filters.cidade && fields.cidade !== filters.cidade) return false
        if (filters.tipo && fields.tipo_imovel !== filters.tipo) return false
        if (filters.finalidade && fields.finalidade !== filters.finalidade) return false
        return true
    })
}

export async function getImovelById(id: string) {
    const { data, error } = await supabase
        .from('produtos_servicos')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return parseImovel(data)
}
