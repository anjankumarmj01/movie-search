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
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Movie } from '../../types/types';
import { Link } from 'react-router-dom';
import { removeFavourite } from '../../store/favourite/favouritesSlice';
import useOnlineStatus from '../../utils/useOnlineStatus';
import OfflineMessage from '../Offline/OfflineMessage';
import { getDisplayValue } from '../../utils/utils';
import { RootState } from '../../store/store';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useNavigation from '../../utils/useNavigation';

const { Meta } = Card;
const { Content } = Layout;
const { Title, Text } = Typography;

const Favourites: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removedMovieTitle, setRemovedMovieTitle] = useState<string>('');
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const dispatch = useDispatch();
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

  if (!onlineStatus) return <OfflineMessage />;

  return (
    <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
      <Content style={{ padding: '20px', backgroundColor: 'white' }}>
        {favourites.length > 0 && (
          <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Favourites
          </Title>
        )}

        {favourites.length === 0 ? (
          <Result
            status="success"
            title="Your favourites will appear here"
            subTitle="No favourites added yet."
            extra={
              <Button type="primary" onClick={handleClick}>
                Back Home
              </Button>
            }
          />
        ) : (
          <Row gutter={[16, 16]}>
            {favourites.map((movie: Movie) => (
              <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={4}>
                <Link to={`/movie/${movie.imdbID}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={movie.Title}
                        src={movie.Poster}
                        style={{
                          height: '300px',
                          objectFit: 'cover',
                        }}
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
                  onClick={() =>
                    handleRemoveFavourite(movie.imdbID, movie.Title)
                  }
                >
                  Remove from Favourites
                </Button>
              </Col>
            ))}
          </Row>
        )}
      </Content>

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined /> Removed from Favourites
          </span>
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
