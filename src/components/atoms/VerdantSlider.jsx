import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from './Button';

const VerdantSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Generador a Gasoil",
            description: "Generador de gasoil funcional con cuadro eléctrico y medidas de protección pertinentes, habilitado en carro de coche.",
            image: "https://cdn.wallapop.com/images/10420/ip/v7/__/c10420p1131837575/i5643468376.jpg?pictureSize=W640",
            tag: "GENERADORES",
            url: "https://es.wallapop.com/item/generador-de-gasoil-1131837575"
        },
        {
            id: 2,
            title: "Cisterna",
            description: "Cuba cisterna para uso agrícola. Ideal para el transporte de líquidos en buen estado funciona perfectamente lista para trabajar presenta algunos bollados 5000 litros",
            image: "https://cdn.wallapop.com/images/10420/kc/5c/__/c10420p1229728363/i6287454060.jpg?pictureSize=W640",
            tag: "CISTERNAS",
            url:"https://es.wallapop.com/item/cuba-cisterna-agricola-1229728363"
        },
        {
            id: 3,
            title: "NEW HOLLAND",
            description: "Tractor New Holland 70-66S en buen estado. 3600 horas de trabajo, muy cuidado no mimado. Tienen inversor mecanico, toma de fuerza 540 y 1000 cabina de fabrica con cristales ahumados originales, cabina gran confort y dos transportines. Mejor ver y probar, esta en El Romeral Toledo",
            image: "https://cdn.wallapop.com/images/10420/kq/mv/__/c10420p1254060578/i6444460119.jpg?pictureSize=W640",
            tag: "TRACTORES",
            url: "https://es.wallapop.com/item/tractor-new-holland-70-66s-1254060578"
        },
        {
            id: 4,
            title: "Apero",
            description: "Aperos, punchones hermanos franch, Remolque, cultivador, sulfatadora de mochila que no sale en las fotos, Cultivador 9-brazos 460 euros-recoge leña le falta un gancho- 150€",
            image: "https://cdn.wallapop.com/images/10420/ke/uj/__/c10420p1234262845/i6316983174.jpg?pictureSize=W640",
            tag: "APEROS",
            url:"https://es.wallapop.com/item/tractor-john-deere-1635-1234262845"
        },
        {
            id: 5,
            title: "JOHN DEERE",
            description: "Tractor modelo 717, ideal para proyectos de restauración. Se encuentra en funcionamiento. Elevador reparado, retenes de las transmisiones cambiados, aceite caja de cambios cambiado.",
            image: "https://cdn.wallapop.com/images/10420/kf/qu/__/c10420p1235770709/i6325819249.jpg?pictureSize=W640",
            tag: "TRACTORES",
            url:"https://es.wallapop.com/item/tractor-717-para-restaurar-1235770709"
        }

    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl bg-[#faf3dd] shadow-xl group">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 ease-out h-[500px]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full relative overflow-hidden">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover brightness-90 transition-transform duration-1000 group-hover:scale-105"
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent flex flex-col justify-end p-12 text-white">
                            <span className="bg-emerald-100/20 backdrop-blur-md text-white text-xs font-bold tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                                {slide.tag}
                            </span>
                            <h2 className="text-4xl font-extrabold mb-4 max-w-lg leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-emerald-50 max-w-md mb-6 leading-relaxed opacity-90">
                                {slide.description}
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    label="IR AL ANUNCIO"
                                    variant="goBuy"
                                    onClick={() => window.open(slide.url, "_blank", "noopener,noreferrer")}
                                />

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <Button
                variant="sliderNavRight"
                onClick={nextSlide}
                icon={ChevronRight}
            />
            <Button
                variant="sliderNavLeft"
                onClick={prevSlide}
                icon={ChevronLeft}
            />

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default VerdantSlider;
