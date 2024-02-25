import { Modal } from "antd";

type TGenericModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const GenericModal = ({ isModalOpen, setIsModalOpen, children }: TGenericModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default GenericModal;
