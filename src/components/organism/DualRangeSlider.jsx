import React, { useState, useRef, useEffect, useCallback } from "react";

const DualRangeSlider = ({
  min = 1,
  max = 10,
  initialMin = 1,
  initialMax = 10,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);

  const minValRef = useRef(initialMin);
  const maxValRef = useRef(initialMax);
  const range = useRef(null);

  // Sincronización limpia con el padre (solo si cambian los valores externos)
  useEffect(() => {
    if (initialMin !== minValRef.current) {
      setMinVal(initialMin);
      minValRef.current = initialMin;
    }
    if (initialMax !== maxValRef.current) {
      setMaxVal(initialMax);
      maxValRef.current = initialMax;
    }
  }, [initialMin, initialMax]);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Actualización visual de la barra verde
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Manejadores de cambio fluidos
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
    if (onChange) onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
    if (onChange) onChange({ min: minVal, max: value });
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-[#faf3dd] p-8 rounded-2xl border border-[#c8d5b9] shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[#4a7c59] font-bold font-['Manrope'] uppercase tracking-wider text-xs">
          Nivel de Atención
        </h3>
        <div className="flex gap-2">
          <span className="bg-[#8fc0a9] text-[#1f2f25] px-3 py-1 rounded-lg text-sm font-bold shadow-inner">
            {minVal}
          </span>
          <span className="text-[#4a7c59] font-bold">-</span>
          <span className="bg-[#8fc0a9] text-[#1f2f25] px-3 py-1 rounded-lg text-sm font-bold shadow-inner">
            {maxVal}
          </span>
        </div>
      </div>

      <div className="relative h-10 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb--left z-[3] absolute w-full h-0 outline-none pointer-events-none appearance-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb thumb--right z-[4] absolute w-full h-0 outline-none pointer-events-none appearance-none"
        />

        <div className="relative w-full h-2 bg-[#c8d5b9] rounded-full">
          <div
            ref={range}
            className="absolute h-full bg-[#4a7c59] rounded-full shadow-[0_0_8px_rgba(74,124,89,0.3)]"
          />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <span className="text-[#4a7c59]/60 text-[10px] font-bold uppercase tracking-tighter">
          Min ({min})
        </span>
        <span className="text-[#4a7c59]/60 text-[10px] font-bold uppercase tracking-tighter text-center">
          Moderate (5)
        </span>
        <span className="text-[#4a7c59]/60 text-[10px] font-bold uppercase tracking-tighter">
          Max ({max})
        </span>
      </div>

      <style>{`
        .thumb::-webkit-slider-thumb {
          background-color: #4a7c59;
          border: 3px solid #faf3dd;
          border-radius: 50%;
          cursor: pointer;
          height: 24px;
          width: 24px;
          margin-top: 0px; /* Corregido para centrar */
          pointer-events: all;
          -webkit-appearance: none;
          transition: transform 0.2s ease-in-out;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .thumb::-webkit-slider-thumb:hover { transform: scale(1.1); }
        .thumb::-webkit-slider-thumb:active { transform: scale(0.95); }
        
        /* Estilos para Firefox */
        .thumb::-moz-range-thumb {
          background-color: #4a7c59;
          border: 3px solid #faf3dd;
          border-radius: 50%;
          cursor: pointer;
          height: 24px;
          width: 24px;
          pointer-events: all;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default DualRangeSlider;