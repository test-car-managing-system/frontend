import { Row, Col } from 'antd';
import styled from 'styled-components';

interface InfoProps {
  children?: React.ReactNode;
  title?: string;
  contents?: { title: string; data?: string }[];
}

function Info({ children, title, contents }: InfoProps) {
  const groupedContents = [];
  if (contents) {
    for (let i = 0; i < contents.length; i += 2) {
      const group = (
        <Row
          justify="space-around"
          key={i}
          style={{ margin: '20px 10px 20px 10px', padding: '10px 0 10px 0' }}
        >
          <Col
            span={4}
            style={{
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '60px', textAlign: 'left' }}>
              {contents[i].title}
            </div>
          </Col>
          <Col span={5} style={{ textAlign: 'left' }}>
            {contents[i].data}
          </Col>
          {contents[i + 1] && (
            <>
              <Col
                span={4}
                style={{
                  fontWeight: '700',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '60px', textAlign: 'left' }}>
                  {contents[i + 1].title}
                </div>
              </Col>
              <Col span={5} style={{ textAlign: 'left' }}>
                {contents[i + 1].data}
              </Col>
            </>
          )}
        </Row>
      );
      groupedContents.push(group);
    }
  }

  return (
    <Wrapper>
      <Title>
        <p>{title}</p>
      </Title>
      <Divider />
      <Content>
        {groupedContents}
        {children}
      </Content>
    </Wrapper>
  );
}

export default Info;

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
  background-color: white;
  border: 0.5px solid black;
  border-radius: 15px;
`;

const Title = styled.div`
  width: 100%;
  padding: 15px;
  ${({ theme }) => theme.typo.text.T_18_EB}
  font-weight: 600;
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
`;

const Divider = styled.div`
  width: 100%;
  border-top: 0.5px solid black;
`;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;

const List = styled.div`
  width: 100%;
  height: 25px;
  padding: 10px 0 10px 0;
`;
