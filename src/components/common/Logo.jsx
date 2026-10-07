import React from 'react';

export function Logo({ className = "w-12 h-12", showText = true }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Insignia Circular Serrada Oficial La Rosaliera */}
      <svg
        viewBox="0 0 200 200"
        className={`${className} shrink-0 drop-shadow-sm`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fondo blanco circular con sombra */}
        <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        
        {/* Borde exterior serrado verde */}
        <path
          d="M 100 12 
             C 105 15, 110 12, 115 17 
             C 120 22, 125 21, 130 27 
             C 135 33, 140 33, 145 40 
             C 150 47, 155 48, 160 56 
             C 165 64, 169 66, 173 75 
             C 177 84, 180 87, 182 97 
             C 184 107, 182 110, 182 120 
             C 182 130, 178 133, 174 142 
             C 170 151, 165 154, 159 162 
             C 153 170, 148 171, 141 178 
             C 134 185, 129 185, 121 190 
             C 113 195, 108 194, 100 196 
             C 92 194, 87 195, 79 190 
             C 71 185, 66 185, 59 178 
             C 52 171, 47 170, 41 162 
             C 35 154, 30 151, 26 142 
             C 22 133, 18 130, 18 120 
             C 18 110, 16 107, 18 97 
             C 20 87, 23 84, 27 75 
             C 31 66, 35 64, 40 56 
             C 45 48, 50 47, 55 40 
             C 60 33, 65 33, 70 27 
             C 75 21, 80 22, 85 17 
             C 90 12, 95 15, 100 12 Z"
          fill="#58A618"
        />

        {/* Anillo interior blanco */}
        <circle cx="100" cy="100" r="76" fill="#FFFFFF" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="#58A618" strokeWidth="3" />

        {/* Ilustración Siluetas Ganaderas (Vaca, Cerdo, Pollo y Trigo) */}
        <g fill="none" stroke="#58A618" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Silueta Cabeza Vaca */}
          <path d="M 65 82 C 65 65, 105 60, 125 72 C 145 84, 140 110, 120 120 C 105 125, 80 120, 65 100 Z" />
          {/* Cuernos de Vaca */}
          <path d="M 75 66 C 70 55, 60 52, 55 58" />
          <path d="M 125 70 C 135 60, 145 60, 150 65" />

          {/* Silueta Cerdo */}
          <path d="M 70 108 C 65 118, 85 130, 110 128 C 125 126, 130 118, 120 112" />

          {/* Silueta Pollo */}
          <path d="M 78 125 C 75 135, 90 145, 102 142" />

          {/* Espiga de Trigo / Ramillete */}
          <path d="M 52 125 C 50 100, 58 75, 76 60" strokeWidth="4" />
          <path d="M 54 110 C 46 106, 46 98, 56 96" />
          <path d="M 60 92 C 52 88, 52 80, 62 78" />
          <path d="M 68 76 C 60 70, 62 62, 72 64" />
        </g>

        {/* Texto del Badge Arc */}
        <path id="textArcTop" d="M 40,100 A 60,60 0 0,1 160,100" fill="none" />
        <path id="textArcBottom" d="M 160,100 A 60,60 0 0,1 40,100" fill="none" />

        <text fontSize="13" fontWeight="900" fill="#FFFFFF" letterSpacing="2.5">
          <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
            ALIMENTOS
          </textPath>
        </text>

        <text fontSize="13" fontWeight="900" fill="#FFFFFF" letterSpacing="2.5">
          <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
            LA ROSALIERA
          </textPath>
        </text>
      </svg>

      {/* Texto de Marca */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-base md:text-lg font-extrabold text-gray-900 tracking-tight leading-none">
            Alimentos <span style={{ color: '#58A618' }}>La Rosaliera</span>
          </span>
          <span className="text-[11px] font-semibold text-gray-500 tracking-tight mt-0.5">
            ¡Frescura del campo a tu mesa!
          </span>
        </div>
      )}
    </div>
  );
}
