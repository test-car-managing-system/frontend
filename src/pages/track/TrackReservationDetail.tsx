import styled from 'styled-components';
import {
  TTrackReservationDetailResponse,
  TTrackReservationSlot,
  TrackReservationStatus,
} from '../../apis/type/track';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Info from '../../components/info/Info';
import TrackApi from '../../apis/TrackApi';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../apis/type/commonResponse';
import ErrorModal from '../../components/modal/ErrorModal';
import ConfirmModal from '../../components/modal/ConfirmModal';
import Button from '../../components/button/Button';
import { Col, Row } from 'antd';

function TrackReservationDetail() {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const [trackReservationDetail, setTrackReservationDetail] =
    useState<TTrackReservationDetailResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    id &&
      TrackApi.getTrackReservationDetail(id as unknown as number).then(
        (res) => res.result && setTrackReservationDetail(res.result),
      );
  }, []);

  const [data, setData] = useState<{ title: string; data?: string }[]>();
  const [reservationTimeDiv, setReservationTimeDiv] = useState<
    React.ReactNode[]
  >([]);
  useEffect(() => {
    setData([
      { title: '시험장명', data: trackReservationDetail?.name },
      { title: '사용자명', data: trackReservationDetail?.memberName },
      { title: '위치', data: trackReservationDetail?.location },
      {
        title: '예약상태',
        data: TrackReservationStatus[
          trackReservationDetail?.status as unknown as keyof typeof TrackReservationStatus
        ],
      },
      { title: '길이', data: `${trackReservationDetail?.length} m` },
      { title: '특성', data: trackReservationDetail?.description },
    ]);

    const timeSlots: string[] = [];
    trackReservationDetail?.reservationTime.forEach((slot) => {
      timeSlots.push(
        `${slot.startedAt?.substring(0, 16)} ~ ${slot.expiredAt
          ?.split(' ')[1]
          .substring(0, 5)}`,
      );
    });
    const timeSlotsNodes: React.ReactNode[] = [];
    timeSlots.sort().forEach((slot) => {
      timeSlotsNodes.push(<Row>{slot}</Row>);
    });
    setReservationTimeDiv(timeSlotsNodes);
  }, [trackReservationDetail]);

  const onDeleteButtonClick = () => {
    setDeleteModalOpen(true);
  };

  const onDeleteButtonConfirmClick = (id: number) => {
    TrackApi.deleteTrackReservation(id)
      .then((res) => {
        setDeleteModalOpen(false);
        navigate('/tracks/reservations/');
      })
      .catch((error: AxiosError) => {
        const data: ErrorResponse = error.response?.data as ErrorResponse;
        setErrorMessage(data.message);
        setErrorModalOpen(true);
      });
  };

  return (
    <Wrapper>
      <ErrorModal
        modalOpen={errorModalOpen}
        content={errorMessage}
        onCancel={() => setErrorModalOpen(false)}
      />
      <ConfirmModal
        title="예약 취소"
        content="해당 예약을 취소하시겠습니까?"
        modalOpen={deleteModalOpen}
        onConfirm={() => onDeleteButtonConfirmClick(id as unknown as number)}
        onCancel={() => setDeleteModalOpen(false)}
        buttonText="취소하기"
        property="delete"
      />
      <Info title="시험장 예약 정보" contents={data}>
        <Row
          justify="space-around"
          key={'trackReservationDetail'}
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
              {'예약 시간'}
            </div>
          </Col>
          <Col span={5} style={{ textAlign: 'left' }}>
            {reservationTimeDiv}
          </Col>
          <Col span={4} style={{ textAlign: 'left' }} />
          <Col span={5} style={{ textAlign: 'left' }} />
        </Row>
      </Info>
      <ButtonContainer>
        <Button
          property="delete"
          label="취소"
          onClick={() => onDeleteButtonClick()}
          state={
            trackReservationDetail &&
            (trackReservationDetail.status == 'RESERVED' ||
              trackReservationDetail.status == 'USING')
          }
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default TrackReservationDetail;

const Wrapper = styled.div``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
  justify-content: right;
  align-items: center;
`;
