'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/atoms/Logo';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { brand } from '@/theme';

const cubicEase = [0.86, 0, 0.07, 1] as const;

export default function Header() {
  const t = useTranslations('nav');
  const tLoc = useTranslations('locations');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';
  const { scrollDirection, scrollY } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [addressSubOpen, setAddressSubOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);

  useLockBodyScroll(menuOpen);

  const isScrolled = scrollY > 10;
  const isHidden = scrollDirection === 'down' && scrollY > 300 && !menuOpen;

  const closeMenu = () => {
    setMenuOpen(false);
    setAddressSubOpen(false);
  };

  const menuLinks = [
    { href: `${prefix}/`, label: t('addresses'), hasSubmenu: true },
    { href: `${prefix}/espaces`, label: t('spaces') },
    { href: `${prefix}/services`, label: t('services') },
    { href: `${prefix}/evenements`, label: t('events') },
    { href: `${prefix}/galerie`, label: t('gallery') },
    { href: `${prefix}/contact`, label: t('contact') },
  ];

  return (
    <>
      {/* Navbar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,transform] duration-700',
          isScrolled
            ? 'bg-black/95'
            : 'bg-transparent',
          isHidden && '-translate-y-full',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Hamburger - left */}
            <button
              className="relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => {
                if (menuOpen) closeMenu();
                else setMenuOpen(true);
              }}
              aria-label="Menu"
            >
              <span
                className={cn(
                  'w-6 h-[1.5px] transition-all duration-500',
                  menuOpen ? 'rotate-45 translate-y-[7.5px] bg-primary' : 'bg-white',
                )}
              />
              <span
                className={cn(
                  'w-6 h-[1.5px] transition-all duration-500',
                  menuOpen ? 'opacity-0' : 'bg-white',
                )}
              />
              <span
                className={cn(
                  'w-6 h-[1.5px] transition-all duration-500',
                  menuOpen ? '-rotate-45 -translate-y-[7.5px] bg-primary' : 'bg-white',
                )}
              />
            </button>

            {/* Logo - center */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <Logo inverted />
              {!isScrolled && (
                <span className="text-[10px] uppercase tracking-[3px] text-white/70 mt-0.5 hidden sm:block">
                  {brand.tagline}
                </span>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-5">
              <LanguageSwitcher className="text-white text-xs tracking-wider" />
              <Link
                href={`${prefix}/contact`}
                className="hidden sm:inline-flex text-[11px] uppercase tracking-[1.2px] text-white font-light border border-white/50 px-5 py-2.5 hover:border-transparent hover:border-b-white/80 transition-all duration-300"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Side menu - slides from left like kwerk.fr */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={closeMenu}
            />

            {/* Main menu panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.7, ease: cubicEase }}
              className="fixed top-0 left-0 z-50 h-full bg-white w-[85vw] sm:w-[50vw] lg:w-[20vw] min-w-[280px] flex flex-col"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-8 h-20">
                <span className="font-heading text-xl tracking-[0.15em] font-bold text-primary">
                  {brand.name}
                </span>
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu links */}
              <nav className="flex flex-col px-8 mt-auto mb-auto gap-1">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                  >
                    {link.hasSubmenu ? (
                      <button
                        onClick={() => setAddressSubOpen(!addressSubOpen)}
                        className={cn(
                          'w-full text-left text-[13px] uppercase tracking-[2px] py-3 flex items-center justify-between group transition-colors duration-300',
                          addressSubOpen ? 'text-primary' : 'text-primary/80 hover:text-primary',
                        )}
                      >
                        {link.label}
                        <svg
                          className={cn(
                            'w-3.5 h-3.5 transition-transform duration-300',
                            addressSubOpen && 'rotate-90',
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block text-[13px] uppercase tracking-[2px] text-primary/80 py-3 hover:text-primary transition-colors duration-300 relative group"
                      >
                        {link.label}
                        <span className="absolute bottom-2 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="px-8 py-8 border-t border-border mt-auto">
                <div className="flex gap-5">
                  <a
                    href={brand.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/50 hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href={brand.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/50 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Address submenu panel - slides next to main menu */}
            <AnimatePresence>
              {addressSubOpen && (
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: cubicEase }}
                  className="fixed top-0 left-[85vw] sm:left-[50vw] lg:left-[20vw] z-50 h-full bg-[#f8f8f8] w-[85vw] sm:w-[50vw] lg:w-[20vw] min-w-[280px]"
                >
                  <div className="h-20 px-8 flex items-center">
                    <span className="text-[11px] uppercase tracking-[2px] text-primary/50">
                      {t('addresses')}
                    </span>
                  </div>

                  {/* Address image */}
                  <div className="px-8 pb-6">
                    <div className="w-full aspect-[4/3] bg-primary/10 rounded-sm overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/content/Escalier_SHO_1.jpg"
                        alt="Nos adresses"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <nav className="px-8 flex flex-col gap-1">
                    {locations.map((loc, i) => (
                      <motion.div
                        key={loc.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                      >
                        <Link
                          href={`${prefix}/adresses/${loc.slug}`}
                          onClick={closeMenu}
                          className="block py-3 group"
                        >
                          <span className="text-[13px] uppercase tracking-[2px] text-primary/80 group-hover:text-primary transition-colors">
                            {tLoc(`${loc.slug}.name`)}
                          </span>
                          <span className="block text-[11px] text-primary/40 mt-0.5">
                            {loc.address}, {loc.zipCode}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

      {/* Mobile sticky CTA bar */}
      <AnimatePresence>
        {scrollY > 300 && !menuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-primary py-4 px-6 flex items-center justify-center lg:hidden"
          >
            <Link
              href={`${prefix}/contact`}
              className="text-[11px] uppercase tracking-[1.5px] text-white font-light border border-white/50 px-8 py-3 hover:bg-white hover:text-primary transition-all duration-300"
            >
              {t('contact')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
