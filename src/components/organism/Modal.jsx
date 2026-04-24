// import { getTitle } from "../utils/getTitle";
// import { BaseModal } from "../atoms/BaseModal";
// import { Cards } from "../molecules/Cards";

// export function Modal({ type, data, onClose }) {
//   if (!type || !data) return null;

//   return (
//     <BaseModal
//       title={getTitle(type, data)}
//       onClose={onClose}
//       type={type}
//     >
//       {type === "product" && (
//         <Cards product={data} variant="modal" />
//       )}
//     </BaseModal>
//   );
// }

import { BaseModal } from "../atoms/BaseModal";
import { ProductModal } from "../molecules/ProductModal";

export function Modal({ type, data, onClose }) {
  if (!type || !data) return null;

  return (
    <BaseModal onClose={onClose}>
      {type === "product" && (
        <ProductModal product={data} onClose={onClose} />
      )}
    </BaseModal>
  );
}