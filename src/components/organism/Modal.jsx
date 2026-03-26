import { BaseModal } from "../atoms/BaseModal";

export function Modal({ characters, onClose }) {
  return characters > 1 ? (
    <BaseModal
      title={<div id="season-episode"></div>}
      onClose={onClose}
    >
      <div id="modal-characters-epi"></div>
    </BaseModal>
  ) : (
    <BaseModal
      title={"Character info:"}
      onClose={onClose}
    >
      <div id="modal-characters"></div>
    </BaseModal>
  );
}