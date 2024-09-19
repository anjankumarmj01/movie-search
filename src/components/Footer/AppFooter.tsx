import { Footer } from 'antd/es/layout/layout';
import { CopyrightOutlined } from '@ant-design/icons';
import { FOOTER_TEXT, MOVIE_SEARCH_TITLE } from '../../constants/constants';

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      {MOVIE_SEARCH_TITLE} <CopyrightOutlined />
      {new Date().getFullYear()} {FOOTER_TEXT}
    </Footer>
  );
};

export default AppFooter;
