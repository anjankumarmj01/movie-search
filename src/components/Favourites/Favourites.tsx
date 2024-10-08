import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Layout,
  Result,
  Typography,
  Image,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Movie } from '../../types/types';
import { Link } from 'react-router-dom';
import { removeFavourite } from '../../store/favourite/favouritesSlice';
import useOnlineStatus from '../../utils/useOnlineStatus';
import OfflineMessage from '../Offline/OfflineMessage';
import { getDisplayValue } from '../../utils/utils';
import { AppDispatch, RootState } from '../../store/store';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useNavigation from '../../utils/useNavigation';
import {
  ANTD_FALLBACK_IMAGE,
  ButtonLabels,
  LOGO,
} from '../../constants/constants';

const { Meta } = Card;
const { Content } = Layout;
const { Title, Text } = Typography;

const Favourites = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removedMovieTitle, setRemovedMovieTitle] = useState<string>('');
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const dispatch = useDispatch<AppDispatch>();
  const onlineStatus = useOnlineStatus();
  const { handleGoHome } = useNavigation();

  const handleRemoveFavourite = (imdbID: string, title: string) => {
    dispatch(removeFavourite(imdbID));
    setRemovedMovieTitle(title);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleClick = () => {
    handleGoHome();
  };

  const renderFavourites = () => (
    <Row gutter={[16, 16]}>
      {favourites.map((movie: Movie) => (
        <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={4}>
          <Link to={`/movie/${movie.imdbID}`}>
            <Card
              hoverable
              cover={
                <Image
                  src={movie.Poster}
                  alt={LOGO}
                  fallback={ANTD_FALLBACK_IMAGE}
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                  preview={false}
                />
              }
              style={{
                position: 'relative',
                width: '200px',
                height: '400px',
                overflow: 'hidden',
              }}
            >
              <Meta
                title={getDisplayValue(movie.Title)}
                description={getDisplayValue(movie.Year?.split('–')[0])}
              />
            </Card>
          </Link>
          <Button
            type="primary"
            style={{ marginTop: 10, width: '200px' }}
            onClick={() => handleRemoveFavourite(movie.imdbID, movie.Title)}
          >
            Remove from Favourites
          </Button>
        </Col>
      ))}
    </Row>
  );

  const renderEmptyFavourites = () => (
    <Result
      status="success"
      title="Your favourites will appear here"
      subTitle="No favourites added yet."
    />
  );

  if (!onlineStatus) return <OfflineMessage />;

  return (
    <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
      <Content style={{ padding: '20px', backgroundColor: 'white' }}>
        {favourites.length > 0 && (
          <Title level={2} style={{ textAlign: 'left', marginBottom: '20px' }}>
            Favourites
          </Title>
        )}

        {favourites.length === 0 ? renderEmptyFavourites() : renderFavourites()}

        {/* Center-align the Back Home button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            padding: '20px 0',
          }}
        >
          <Button type="primary" onClick={handleClick}>
            {ButtonLabels.BACK_HOME}
          </Button>
        </div>
      </Content>

      <Modal
        title={
          <Text>
            <ExclamationCircleOutlined /> Removed from Favourites
          </Text>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        centered
        width={400}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Text strong>{removedMovieTitle}</Text> has been removed from your
        favourites!
      </Modal>
    </Layout>
  );
};

export default Favourites;
