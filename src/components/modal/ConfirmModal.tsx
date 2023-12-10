import { Modal } from 'antd';
import styled from 'styled-components';
import Button from '../button/Button';
import ConfirmButton from '../button/ConfirmButton';

interface ConfirmModalProps {
  title: string;
  content: any;
  modalOpen: boolean;
  onConfirm?: any;
  onCancel?: () => any;
  buttonText: string;
  property?: 'default' | 'update' | 'logout' | 'delete';
}

function ConfirmModal({
  modalOpen,
  onConfirm,
  onCancel,
  title,
  content,
  buttonText,
  property = 'default',
}: ConfirmModalProps) {
  return (
    <Modal
      style={{ border: '1px solid black', fontWeight: '500' }}
      title={<Title>{title}</Title>}
      centered
      open={modalOpen}
      onOk={onConfirm}
      footer={
        <ButtonWrapper>
          <ConfirmButton
            label={buttonText}
            property={property}
            onClick={onConfirm}
          ></ConfirmButton>
        </ButtonWrapper>
      }
      onCancel={onCancel}
    >
      <Wrapper>{content}</Wrapper>
    </Modal>
  );
}

export default ConfirmModal;

const Title = styled.div`
  ${({ theme }) => theme.typo.text.T_18_EB};
  font-weight: 700;
  padding: 8px 0 8px 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const Wrapper = styled.div`
  margin-top: 10px;
  border-top: 1px solid black;
  padding: 15px 0 15px;
  ${({ theme }) => theme.typo.text.T_16_EB};
  font-weight: 500;
`;
