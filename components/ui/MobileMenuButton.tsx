'use client';

import { useState, useSyncExternalStore } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MobileMenuButton() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) return null;

  return (
    <>
      <button
        className="md:hidden fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg z-50 hover:bg-primary-hover transition pointer-events-auto"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 50,
        }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} className="text-white" />
      </button>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
