'use client'

import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import styles from './loginModal.module.css'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
                    <X size={24} />
                </button>

                <div className={styles.header}>
                    <Image
                        src="/LOGO_HV5.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className={styles.logoImage}
                    />
                    <h2 className={styles.title}>Soluções Imobiliárias</h2>
                </div>

                <p className={styles.description}>
                    Entre para ver seus favoritos, visitas, propostas e aluguéis
                </p>

                <button className={styles.loginButton}>
                    Entrar
                </button>
            </div>
        </div>
    )
}
