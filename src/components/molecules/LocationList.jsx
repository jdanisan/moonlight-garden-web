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

  // Functionn for open the modal
  // const handleClick = () => {
  //   console.log("OPEN");
  //   setShowModal(true);
  // };

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
    <div className="container-list">
      <List
        items={locations}
        className="location-list"
        renderItem={(location) => (
          <div className="location-header">
            <h3>{location.name}</h3>
            <div className="info-locations">
              <div className="label-location">
                <DimensionIcon />
                <span>{location.dimension}</span>
              </div>

              <div className="label-location">
                <LocationIcon />
                <span>{location.type}</span>
              </div>

              <div className="label-location">
                <Button
                  icon={PeopleIcon}
                  // onClick={handleClick}
                  onClick={() => openModal("location", location)}
                  label={location.residents.length}
                  className="load-residents"
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
        classNameLi="location-item"
      />
    </div>
  );
}
