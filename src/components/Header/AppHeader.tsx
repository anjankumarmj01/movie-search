import { Layout, Typography, Image } from 'antd';
import movieSearchLogo from '../../assets/movieSearch.jpg';
import useNavigation from '../../utils/useNavigation';
import { LOGO, MOVIE_SEARCH_TITLE } from '../../constants/constants';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const { handleGoHome } = useNavigation();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      handleGoHome();
    }
  };

  return (
    <Header style={headerStyle}>
      <div style={logoContainerStyle} onClick={handleClick}>
        <Image
          src={movieSearchLogo}
          alt={LOGO}
          style={logoStyle}
          preview={false}
        />
        <Text style={movieSearchTextStyle}>{MOVIE_SEARCH_TITLE}</Text>
      </div>
    </Header>
  );
};

const headerStyle: React.CSSProperties = {
  background: '#001529',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const logoStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  marginRight: '20px',
};

const movieSearchTextStyle: React.CSSProperties = {
  fontSize: '24px',
  background: 'linear-gradient(90deg, #ff0080, #ff8c00)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
};

export default AppHeader;
