import React, { useEffect, useState } from "react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const imagenes = [
    { src: "https://cdn.wallapop.com/images/10420/ip/v7/__/c10420p1131837575/i5643468376.jpg?pictureSize=W640", id: "anuncio1" },
    { src: "https://cdn.wallapop.com/images/10420/kb/kf/__/c10420p1228752416/i6309806661.jpg?pictureSize=W640", id: "anuncio2" },
    { src: "https://cdn.wallapop.com/images/10420/ke/uj/__/c10420p1234262845/i6316983174.jpg?pictureSize=W640", id: "anuncio3" },
    { src: "https://cdn.wallapop.com/images/10420/kf/cp/__/c10420p1235110467/i6329881967.jpg?pictureSize=W640", id: "anuncio4" },
    { src: "https://cdn.wallapop.com/images/10420/kf/qu/__/c10420p1235770709/i6325819249.jpg?pictureSize=W640", id: "anuncio5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagenes.map((img) => (
          <img
            key={img.id}
            src={img.src}
            className="w-full  h-full object-contain object-center cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;