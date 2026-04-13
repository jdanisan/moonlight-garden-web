import { List } from "./Lists";
import { useState, useEffect } from "react";
import { Image } from "../atoms/Image";
import { Button } from "../atoms/Button";
import { LocationIcon } from "../atoms/icons/LocationIcon";
import { DimensionIcon } from "../atoms/icons/DimensionIcon";
import { PeopleIcon } from "../atoms/icons/PeopleIcon";

import { Modal } from "../organism/Modal";

export function LocationsList({ locations }) {
  const [showModal, setShowModal] = useState(false);
  // Functionn for open the modal
  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

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
    <div className="container-list">
      <div className="location-header">
        <List
          items={locations}
          className="location-list"
          renderItem={(location) => (
            <div className="location-item">
              <h3>{location.name}</h3>
              <DimensionIcon/>
              <span>{location.dimension}</span>
              
              <LocationIcon/>
              <span>{location.type}</span>
              <Button
                icon={PeopleIcon}
                onClick={handleClick}
                label={location.residents.length}
                className="load-residents"
              />
              {showModal && (
                <Modal characters={location.residents} onClose={handleClose} />
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
