import styled from 'styled-components';

interface TemplateProps {
  children?: React.ReactNode;
  variant?: string;
}

function Template({ children, variant }: TemplateProps) {
  return <Wrapper>{<Container>{children}</Container>}</Wrapper>;
}

export default Template;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;
  background-color: '#121212';
`;
