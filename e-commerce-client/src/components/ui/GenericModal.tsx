import { Modal } from "antd";

type TGenericModalProps = {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  remaining?: Record<string, unknown>;
};

const GenericModal = ({ title, isModalOpen, setIsModalOpen, children, ...remaining }: TGenericModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        {...remaining}
        title={title}
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
