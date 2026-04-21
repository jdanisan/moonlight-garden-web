import { List } from "./Lists";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Image } from "../atoms/Image";
import { Button } from "../atoms/Button";
import { LocationIcon } from "../atoms/icons/LocationIcon";
import { DimensionIcon } from "../atoms/icons/DimensionIcon";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";

import { Modal } from "../organism/Modal";

export function LocationsList({ locations }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const { openModal } = useContext(AppContext);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);
  return (
    <div className="w-11/12 p-5 bg-white m-auto rounded-lg grid gap-4  ">
      <List
        items={locations}
        className="list-none p-0 m-0"
        renderItem={(location) => (
          <div className="p-2.5 bg-gray-100 text-primary-600 font-bold flex  flex-wrap sm:flex-row items-center justify-between m-0 ">
            <h3 className="m-0 font-bold text-xl sm:text-[14px] mb-1.5">{location.name}</h3>
            <div className="flex clex-col flex-wrap sm:flex-row  gap-4">
              <div className="flex justify-center items-center gap-2">
                <DimensionIcon />
                <span>{location.dimension}</span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <LocationIcon />
                <span>{location.type}</span>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Button
                  icon={PeopleIcon}
                  onClick={() => openModal("location", location)}
                  label={location.residents.length}
                  variant="residentsRate"
                />
                {showModal && (
                  <Modal
                    data={location}
                    onClose={handleClose}
                    type="location"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        classNameLi="mb-2.5 rounded-lg overflow-hidden bg-white transition-all duration-300 ease-in-out"
      />
    </div>
  );
}
