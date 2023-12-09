import { Modal } from 'antd';
import styled from 'styled-components';
import ConfirmButton from '../button/ConfirmButton';

interface ConfirmModalProps {
  title: string;
  content: string;
  modalOpen: boolean;
  onCancel: any;
}

function AlertModal({
  modalOpen,
  title,
  content,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      style={{ border: '1px solid black', fontWeight: '500' }}
      title={<Title>{title}</Title>}
      centered
      open={modalOpen}
      onCancel={onCancel}
      footer={
        <ButtonWrapper>
          <ConfirmButton
            label={'확인'}
            property={'update'}
            onClick={onCancel}
          ></ConfirmButton>
        </ButtonWrapper>
      }
    >
      <Wrapper>{content}</Wrapper>
    </Modal>
  );
}

export default AlertModal;

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
