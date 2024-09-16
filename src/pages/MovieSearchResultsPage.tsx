import React from 'react';
import { Row, Col, Button, Modal, Result, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../types/types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getDisplayValue, handleRetry } from '../utils/utils';
import { Image } from 'antd';
import { ANTD_FALLBACK_IMAGE, LOGO, REFRESH } from '../constants/constants';
import Shimmer from '../components/Shimmer/Shimmer';

const { Meta } = Card;
const { Text } = Typography;

interface MovieSearchResultsProps {
  isLoading: boolean;
  error: unknown;
  searchTerm: string;
  searchResults: Movie[];
  favouriteIds: string[];
  handleAddToFavourites: (movie: Movie) => void;
  isModalVisible: boolean;
  addedMovieTitle: string;
  handleOk: () => void;
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({
  isLoading,
  error,
  searchTerm,
  searchResults,
  favouriteIds,
  handleAddToFavourites,
  isModalVisible,
  addedMovieTitle,
  handleOk,
}) => {
  // Render loading state
  const renderLoading = () => <Shimmer count={12} type="search" />;

  // Render error state
  const renderError = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Result
        status="warning"
        title="Error occurred while fetching movies"
        subTitle="It seems there was a problem connecting to the server."
        extra={
          <Button
            type="primary"
            onClick={handleRetry}
            style={{ margin: '10px' }}
          >
            {REFRESH}
          </Button>
        }
      />
    </div>
  );

  // Render empty search prompt
  const renderEmptySearchPrompt = () => (
    <Result
      status="success"
      title="Your searched movies appear here"
      subTitle="Please start searching"
    />
  );

  // Render no results found
  const renderNoResults = () => (
    <Result
      title={`No movies found matching "${searchTerm}".`}
      subTitle="Please try a different title."
    />
  );

  // Render search results
  const renderSearchResults = () => (
    <Row gutter={[16, 16]}>
      {searchResults.map((movie: Movie) => (
        <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={4}>
          <Link to={`/movie/${movie.imdbID}`}>
            <div style={{ width: '200px', height: '400px' }}>
              <Card
                hoverable
                cover={
                  <Image
                    src={movie.Poster}
                    alt={LOGO}
                    fallback={ANTD_FALLBACK_IMAGE}
                    style={{ height: '300px', objectFit: 'cover' }}
                    preview={false}
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
                  description={getDisplayValue(movie?.Year?.split('–')[0])}
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
  );

  // Render modal for added favourites
  const renderModal = () => (
    <Modal
      title={
        <Text>
          <ExclamationCircleOutlined /> Added to Favourites
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
      <Text strong>{addedMovieTitle}</Text> has been added to your favourites!
    </Modal>
  );

  // Main render logic
  return (
    <>
      {isLoading
        ? renderLoading()
        : error
          ? renderError()
          : searchTerm === '' && searchResults.length === 0
            ? renderEmptySearchPrompt()
            : searchTerm.length >= 3 && searchResults.length === 0
              ? renderNoResults()
              : searchTerm.length >= 3 && searchResults.length > 0
                ? renderSearchResults()
                : null}

      {renderModal()}
    </>
  );
};

export default MovieSearchResults;
