import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../store/api';
import { Table, Button, Row, Col, Result, Image } from 'antd';
import useOnlineStatus from '../utils/useOnlineStatus';
import OfflineMessage from '../components/Offline/OfflineMessage';
import { getDisplayValue, handleGoBack } from '../utils/utils';
import Shimmer from '../components/Shimmer/Shimmer';
import {
  ANTD_FALLBACK_IMAGE,
  ButtonLabels,
  LOGO,
} from '../constants/constants';
import useNavigation from '../utils/useNavigation';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetMovieDetailsQuery(id!);
  const onlineStatus = useOnlineStatus();
  const { handleGoHome } = useNavigation();

  const columns = [
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const tableData = [
    { key: '1', detail: 'Title', value: getDisplayValue(data?.Title) },
    {
      key: '2',
      detail: 'Year',
      value: getDisplayValue(data?.Year?.split('–')[0]),
    },
    { key: '3', detail: 'Language', value: getDisplayValue(data?.Language) },
    { key: '4', detail: 'Director', value: getDisplayValue(data?.Director) },
    { key: '5', detail: 'Actors', value: getDisplayValue(data?.Actors) },
    { key: '6', detail: 'Genre', value: getDisplayValue(data?.Genre) },
    { key: '7', detail: 'Plot', value: getDisplayValue(data?.Plot) },
    {
      key: '8',
      detail: 'IMDB Rating',
      value: getDisplayValue(data?.imdbRating),
    },
    { key: '9', detail: 'Runtime', value: getDisplayValue(data?.Runtime) },
  ];

  if (!onlineStatus) return <OfflineMessage />;

  return (
    <div style={{ padding: '20px' }}>
      {isLoading ? (
        <Shimmer type="details" />
      ) : error ? (
        <Result
          status="warning"
          title="Error occured while fetching movie details"
        />
      ) : (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Image
                src={data?.Poster}
                alt={LOGO}
                fallback={ANTD_FALLBACK_IMAGE}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '300px',
                  display: 'block',
                  margin: '0 auto',
                }}
                preview={false}
              />
            </Col>
            <Col xs={24} sm={12} md={16}>
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                bordered
                size="middle"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="primary"
              onClick={handleGoHome}
              style={{ marginRight: '10px' }}
            >
              {ButtonLabels.BACK_HOME}
            </Button>
            <Button onClick={handleGoBack}>{ButtonLabels.GO_BACK}</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
