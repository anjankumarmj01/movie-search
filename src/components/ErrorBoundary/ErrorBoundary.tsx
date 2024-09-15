import { Result, Button } from 'antd';
import useNavigation from '../../utils/useNavigation';

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
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorBoundary;
