import { BaseModal } from "../atoms/BaseModal";
import { ProductModal } from "../molecules/ProductModal";

export function Modal({ type, data, onClose }) {
  if (!type || !data) return null;

  return (
    <BaseModal onClose={onClose}>
      {type === "product" && (
        <ProductModal product={data} onClose={onClose} />
      )}
      {(type === "form-user" || type === "new-user") && (
        <UserAuthModal variant={type} onClose={onClose} />
      )}
    </BaseModal>
  );
}