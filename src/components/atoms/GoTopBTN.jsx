import { useEffect, useState } from "react";
import { Button } from "./Button";
import { UpIcon } from "./icons/UpIcon";

export function GoTopBTN() {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      icon={UpIcon}
      onClick={handleClick}
      className="btn-top"
      aria-label="Go to top"
    />
  );
}