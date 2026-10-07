import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export function ShareButton({ title, text, url, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = url || window.location.href;
    const shareData = {
      title: title || 'Alimentos La Rosaliera',
      text: text || '¡Mira este producto fresco de Alimentos La Rosaliera!',
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Compartir cancelado por el usuario
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error al copiar enlace', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${className}`}
      title="Compartir producto"
      style={{
        backgroundColor: copied ? '#EBF7DF' : '#F1F5F9',
        color: copied ? '#58A618' : '#475569'
      }}
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
    </button>
  );
}
