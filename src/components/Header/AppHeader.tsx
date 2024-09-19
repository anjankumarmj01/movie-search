import { Layout, Typography, Image } from 'antd';
import movieSearchLogo from '../../assets/movieSearch.jpg';
import {
  ANTD_FALLBACK_IMAGE,
  LOGO,
  MOVIE_SEARCH_TITLE,
} from '../../constants/constants';
import { handleRefreshApp } from '../../utils/utils';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const handleClick = () => {
    handleRefreshApp();
  };

  return (
    <Header style={headerStyle}>
      <div style={logoContainerStyle} onClick={handleClick}>
        <Image
          src={movieSearchLogo}
          alt={LOGO}
          fallback={ANTD_FALLBACK_IMAGE}
          preview={false}
          style={logoStyle}
        />
        <Text style={movieSearchTextStyle}>{MOVIE_SEARCH_TITLE}</Text>
      </div>
    </Header>
  );
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  justifyContent: 'space-between',
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const logoStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
};

const movieSearchTextStyle: React.CSSProperties = {
  fontSize: '24px',
  background: 'linear-gradient(90deg, #ff0080, #ff8c00)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
};

export default AppHeader;
