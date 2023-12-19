import styled from 'styled-components';
import CarReservationTable from '../../components/table/CarReservationTable';
import TrackMyReservaitonTable from '../../components/table/TrackMyReservaitonTable';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import CarApi from '../../apis/CarApi';
import { TCarReservationRankingResponse } from '../../apis/type/car';
import TrackApi from '../../apis/TrackApi';
import { TTrackReservationRankingResponse } from '../../apis/type/track';
import ReservationRankingChart from '../../components/chart/ReservationRankingChart';
import TableTitle from '../../components/table/TableTitle';

interface Data {
  id: string;
  value: number;
}

function DashBoard() {
  const [carReservationsRank, setCarReservationsRank] = useState<
    TCarReservationRankingResponse[]
  >([]);

  const [carReservationsRankData, setCarReservationsRankData] = useState<
    Data[]
  >([]);

  const [trackReservationsRank, setTrackReservationsRank] = useState<
    TTrackReservationRankingResponse[]
  >([]);

  const [trackReservationsRankData, setTrackReservationsRankData] = useState<
    Data[]
  >([]);

  useEffect(() => {
    CarApi.getCarReservationsRanking().then((res) => {
      res && setCarReservationsRank(res.result);
    });

    TrackApi.getTrackReservationsRanking().then((res) => {
      res && setTrackReservationsRank(res.result);
    });
  }, []);

  useEffect(() => {
    const carData: Data[] = [];
    const trackData: Data[] = [];
    carReservationsRank.forEach((rank) => {
      carData.push({
        id: rank.name,
        value: rank.count,
      });
    });

    trackReservationsRank.forEach((rank) => {
      trackData.push({
        id: rank.name,
        value: rank.count,
      });
    });
    setCarReservationsRankData(carData);
    setTrackReservationsRankData(trackData);
  }, [carReservationsRank, trackReservationsRank]);

  return (
    <Wrapper>
      <Container>
        <ReservationRankingChart
          data={carReservationsRankData}
          title={'최근 1주일 차량 대여 순위'}
        />
        <ReservationRankingChart
          data={trackReservationsRankData}
          title={'최근 1주일 시험장 대여 순위'}
        />
      </Container>
      <CarReservationTable title="나의 시험 차량 대여 현황" />
      <SizedBox />
      <TrackMyReservaitonTable title="나의 시험장 대여 현황" />
    </Wrapper>
  );
}

export default DashBoard;

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: center;
`;

const SizedBox = styled.div`
  width: 100%;
  height: 50px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justifiy-content: space-around;
  align-items: center;
`;
