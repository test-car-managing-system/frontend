import styled from 'styled-components';
import TrackTable from '../../components/table/TrackSelectionTable';
import { TTrackResponse } from '../../apis/type/track';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Info from '../../components/info/Info';
import TrackApi from '../../apis/TrackApi';
import TrackReservationDateBoard from '../../components/board/TrackReservationBoard';

function TrackSelectionDetail() {
  const [track, setTrack] = useState<TTrackResponse>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id &&
      TrackApi.getTrackDetail(id as unknown as number).then(
        (res) => res.result && setTrack(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  useEffect(() => {
    setData([
      { title: '시험장명', data: track?.name },
      { title: '기상상태', data: '맑음' }, //todo
      { title: '위치', data: track?.location },
      { title: '기온', data: `${25}℃` },
      { title: '길이', data: `${track?.length} m` },
      { title: '특성', data: track?.description },
    ]);
  }, [track]);

  return (
    <Wrapper>
      <Info title="시험장 정보" contents={data}></Info>
      <VerticalSizedBox />
      <TrackReservationDateBoard />
    </Wrapper>
  );
}

export default TrackSelectionDetail;

const Wrapper = styled.div``;

const SizedBox = styled.div`
  width: 100%;
  height: 20px;
`;

const VerticalSizedBox = styled.div`
  width: 100%;
  height: 20px;
`;
