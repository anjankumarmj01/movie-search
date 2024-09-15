import { Result, Button } from 'antd';
import useNavigation from '../../utils/useNavigation';
import { BACK_HOME } from '../../constants/constants';

const ErrorBoundary = () => {
  const { handleGoHome } = useNavigation();

  const handleClick = () => {
    handleGoHome();
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Something went wrong on the server."
      extra={
        <Button type="primary" onClick={handleClick}>
          {BACK_HOME}
        </Button>
      }
    />
  );
};

export default ErrorBoundary;
