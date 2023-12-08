import styled from 'styled-components';

interface TableTitleProps {
  children?: React.ReactNode;
  text?: string;
}

function TableTitle({ children, text }: TableTitleProps) {
  return (
    <Title>
      <p>{text}</p>
      {children}
    </Title>
  );
}

export default TableTitle;

const Title = styled.div`
  padding: 15px 15px 15px 0;
  width: 100%;
  ${({ theme }) => theme.typo.text.T_21_EB}
  font-weight: 800;
`;
