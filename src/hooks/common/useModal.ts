import { useState } from "react";

export default function useModal(open = false) {
  const [isModalOpen, setModalOpen] = useState(open);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  return {
    isOpen: isModalOpen,
    toggle: toggleModal,
    show: showModal,
    hide: hideModal,
  };
}
