import { useCallback, useEffect, useState } from 'react';
import { useSearchMoviesQuery } from '../store/api';
import { Input, Button, Badge, GetProps } from 'antd';
import { Movie } from '../types/types';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite } from '../store/favourite/favouritesSlice';
import { setSearchResults, setSearchTerm } from '../store/search/searchSlice';
import OfflineMessage from '../components/Offline/OfflineMessage';
import { AppDispatch, RootState } from '../store/store';
import MovieSearchResultsPage from './MovieSearchResultsPage'; // Import the child component
import { Link } from 'react-router-dom';

const { Search } = Input;

const SearchPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addedMovieTitle, setAddedMovieTitle] = useState('');
  const [showError, setShowError] = useState(false); // State for managing error display
  const dispatch = useDispatch<AppDispatch>();
  const onlineStatus = useOnlineStatus();

  type SearchProps = GetProps<typeof Input.Search>;

  // Selectors
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites
  );
  const favouriteIds = favourites.map((movie: Movie) => movie.imdbID);

  // Fetch movies based on search term
  const { data, isLoading, error } = useSearchMoviesQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  // Function to dispatch search results based on API response
  const dispatchSearchResults = useCallback(() => {
    if (data) {
      if (data?.Response === 'True') {
        dispatch(setSearchResults(data));
      } else {
        dispatch(
          setSearchResults({ Search: [], totalResults: '0', Response: 'False' })
        );
      }
    }
  }, [data, dispatch]);

  // Effect to dispatch search results when data changes
  useEffect(() => {
    dispatchSearchResults();
  }, [dispatchSearchResults]);

  // Handle search term input
  const onSearch: SearchProps['onSearch'] = (value) => {
    if (value.length >= 3) {
      dispatch(setSearchTerm(value));
      setShowError(false);
    } else {
      setShowError(true);
    }
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

  if (!onlineStatus) return <OfflineMessage />;

  return (
    <div style={{ padding: '20px' }}>
      <Link to={'/favourites'}>
        <Button type="primary" style={{ float: 'right', marginBottom: 20 }}>
          View Favourites
        </Button>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Search
          placeholder="Search by title (enter minimum of 3 characters)"
          allowClear
          enterButton
          onSearch={onSearch}
          style={{ width: 400, marginBottom: 20 }}
        />
        {showError && (
          <Badge
            count="Please enter at least 3 characters to search"
            style={{
              backgroundColor: '#f5222d',
              color: '#fff',
              marginLeft: '10px',
              borderRadius: '12px',
              padding: '4px 12px',
            }}
          />
        )}
      </div>
      {/* Pass necessary props to the child component */}
      <MovieSearchResultsPage
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        searchResults={data?.Search || []}
        favouriteIds={favouriteIds}
        handleAddToFavourites={handleAddToFavourites}
        isModalVisible={isModalVisible}
        addedMovieTitle={addedMovieTitle}
        handleOk={handleOk}
      />
    </div>
  );
};

export default SearchPage;
