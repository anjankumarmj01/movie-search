import { Result, Button } from 'antd';
import useNavigation from '../utils/useNavigation';
import { ButtonLabels } from '../constants/constants';

const NotFoundPage = () => {
  const { handleGoHome } = useNavigation();

  const handleClick = () => {
    handleGoHome();
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleClick}>
          {ButtonLabels.BACK_HOME}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
