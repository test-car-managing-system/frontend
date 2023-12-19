import { ResponsivePie } from '@nivo/pie';
import { useEffect } from 'react';
import TableTitle from '../table/TableTitle';
import styled from 'styled-components';

interface Data {
  id: string;
  value: number;
}

interface ChartProps {
  data: Data[];
  title: string;
}

function ReservationRankingChart({ data, title }: ChartProps) {
  return (
    <Wrapper>
      <TableTitle text={title}></TableTitle>
      <ChartBox>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.45}
          padAngle={1}
          cornerRadius={1}
          activeOuterRadiusOffset={8}
          colors={{ scheme: 'blues' }}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 25,
              translateY: 56,
              itemsSpacing: -20,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      </ChartBox>
    </Wrapper>
  );
}

export default ReservationRankingChart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ChartBox = styled.div`
  width: 500px;
  height: 400px;
`;
