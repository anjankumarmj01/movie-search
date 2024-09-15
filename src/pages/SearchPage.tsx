import { useCallback, useEffect, useState } from 'react';
import { useSearchMoviesQuery } from '../store/api';
import { Input, Card, Row, Col, Button, Modal, Typography, Result } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../types/types';
import useOnlineStatus from '../utils/useOnlineStatus';
import Shimmer from '../components/Shimmer/Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite } from '../store/favourite/favouritesSlice';
import { setSearchResults, setSearchTerm } from '../store/search/searchSlice';
import OfflineMessage from '../components/Offline/OfflineMessage';
import { getDisplayValue } from '../utils/utils';
import { RootState } from '../store/store';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Meta } = Card;
const { Text } = Typography;

const SearchPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedMovieTitle, setAddedMovieTitle] = useState('');
  const dispatch = useDispatch();

  // Selectors
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const searchResults = useSelector((state: RootState) => state.search.results);
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const favouriteIds = favourites.map((movie: Movie) => movie.imdbID);

  // Fetch movies based on search term
  const { data, isLoading, error } = useSearchMoviesQuery(searchTerm, {
    skip: searchTerm.length === 0,
  });

  // Function to dispatch search results based on API response
  const dispatchSearchResults = useCallback(() => {
    if (data) {
      if (data.Response === 'True') {
        dispatch(setSearchResults(data));
      } else {
        dispatch(
          setSearchResults({
            Search: [],
            totalResults: '0',
            Response: 'False',
          })
        );
      }
    }
  }, [data, dispatch]);

  // Effect to dispatch search results when data changes
  useEffect(() => {
    dispatchSearchResults();
  }, [dispatchSearchResults]);

  // Handle search term input
  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  // Handle adding movie to favourites
  const handleAddToFavourites = (movie: Movie) => {
    dispatch(addFavourite(movie));
    setAddedMovieTitle(movie.Title);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <OfflineMessage />;

  return (
    <div style={{ padding: '20px' }}>
      <Link to={'/favourites'}>
        <Button type="primary" style={{ float: 'right', marginBottom: 20 }}>
          View Favourites
        </Button>
      </Link>
      <Search
        placeholder="Search movies by title"
        allowClear
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: 20 }}
      />
      {isLoading ? (
        <Shimmer count={12} type="search" />
      ) : error ? (
        <Result
          status="warning"
          title="Error occured while fetching movie details"
        />
      ) : (
        <>
          {searchTerm === '' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                textAlign: 'center',
              }}
            >
              <Result
                status="success"
                title="Your searched movies appear here"
                subTitle="Please start searching"
              />
            </div>
          ) : searchResults?.length === 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                textAlign: 'center',
              }}
            >
              {searchTerm.length < 3 ? (
                <Result
                  title={`Too many results for "${searchTerm}".`}
                  subTitle="Please type a minimum of three characters."
                />
              ) : (
                <Result
                  title={`No movies found matching "${searchTerm}".`}
                  subTitle="Please try a different title."
                />
              )}
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {searchResults?.map((movie: Movie) => (
                <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={4}>
                  <Link to={`/movie/${movie.imdbID}`}>
                    <div style={{ width: '200px', height: '400px' }}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={movie.Title}
                            src={movie.Poster}
                            style={{ height: '300px', objectFit: 'cover' }}
                          />
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                        }}
                      >
                        <Meta
                          title={getDisplayValue(movie?.Title)}
                          description={getDisplayValue(
                            movie?.Year?.split('–')[0]
                          )}
                        />
                      </Card>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    style={{ marginTop: 10, width: '200px' }}
                    onClick={() => handleAddToFavourites(movie)}
                    disabled={favouriteIds.includes(movie.imdbID)}
                  >
                    {favouriteIds.includes(movie.imdbID)
                      ? 'Already in Favourites'
                      : 'Add to Favourites'}
                  </Button>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined /> Added to Favourites
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
        <Text strong>{addedMovieTitle}</Text> has been added to your favourites!
      </Modal>
    </div>
  );
};

export default SearchPage;
