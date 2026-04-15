import { getTitle } from "../utils/getTitle";
import { BaseModal } from "../atoms/BaseModal";
import { Cards } from "../molecules/Cards";

export function Modal({ type, data, onClose }) {
  if (!type || !data) return null;
  console.log("MODAL :",type, data);
  return (
    <BaseModal title={getTitle(type, data)} onClose={onClose} type={type}>
      {type === "character" && <Cards character={data} variant="modal" />}

      {type === "location" &&
        data.residents?.map((char) => (
          <Cards key={char.id || char} character={char} variant="default"/>
        ))}

      {type === "episode" &&
        data.characters?.map((char) => (
          <Cards key={char.id || char} character={char} variant="default"/>
        ))}
    </BaseModal>
  );
}
