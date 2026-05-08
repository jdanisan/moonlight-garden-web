import { BaseModal } from "../atoms/BaseModal";
import { ProductModal } from "../molecules/ProductModal";
import { ArticleModal } from "./ArticleModal";
import { UserAuthModal } from "./UserAuthModal";
import { useState, useEffect } from "react";

export function Modal({ type, data, onClose }) {
  if (!type) return null;

  const needsData = ["product", "article"];

  const [variant, setVariant] = useState(type);

  useEffect(() => {
    setVariant(type);
  }, [type]);

  if (needsData.includes(type) && !data) return null;

  return (
    <BaseModal onClose={onClose}>
      {type === "product" && (
        <ProductModal product={data} onClose={onClose} />
      )}

      {(type === "form-user" || type === "new-user") && (
        <UserAuthModal
          variant={variant}
          onClose={onClose}
          onSwitch={() =>
            setVariant((prev) =>
              prev === "new-user" ? "form-user" : "new-user"
            )
          }
        />
      )}

      {type === "article" && (
        <ArticleModal article={data} onClose={onClose} />
      )}
    </BaseModal>
  );
}