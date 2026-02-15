'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, UserCircle2 } from 'lucide-react'
import styles from './header.module.css'
import LoginModal from './LoginModal'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const openModal = () => {
        setIsModalOpen(true)
        setIsMenuOpen(false) // Close mobile menu if open
    }

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.inner}`}>
                    <div className={styles.logoContainer}>
                        <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
                            <Image
                                src="/LOGO_HV5.png"
                                alt="Soluções Imobiliárias Logo"
                                width={55}
                                height={55}
                                className={styles.logoImage}
                            />
                            <div className={styles.logoTextContainer}>
                                <span className={styles.logoText}>Soluções</span>
                                <span className={styles.logoText}>Imobiliárias</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`${styles.nav} ${styles.desktopNav}`}>
                        <Link href="/imoveis" className={styles.navLink}>Imóveis</Link>
                        <Link href="/contato" className={styles.navLink}>Contato</Link>
                        <Link href="#" className={styles.navLink}>Sobre nós</Link>
                        <Link href="#" className={styles.navLink}>Central de Ajuda 👋</Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className={`${styles.actions} ${styles.desktopActions}`}>
                        <button className={styles.loginButtonPill} onClick={openModal}>
                            <UserCircle2 size={20} />
                            <span>Entrar</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className={styles.backdrop} onClick={toggleMenu}></div>
            )}

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link href="/imoveis" className={styles.mobileNavLink} onClick={toggleMenu}>Imóveis</Link>
                    <Link href="/contato" className={styles.mobileNavLink} onClick={toggleMenu}>Contato</Link>
                    <Link href="#" className={styles.mobileNavLink} onClick={toggleMenu}>Sobre nós</Link>
                    <Link href="#" className={styles.mobileNavLink} onClick={toggleMenu}>Central de Ajuda 👋</Link>

                    <div className={styles.mobileLoginContainer}>
                        <p className={styles.mobileLoginText}>
                            Entre para ver seus favoritos, visitas, propostas e aluguéis
                        </p>
                        <button className={`btn btn-primary ${styles.mobileCta}`} onClick={openModal}>Entrar</button>
                    </div>
                </nav>
            </div>

            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
