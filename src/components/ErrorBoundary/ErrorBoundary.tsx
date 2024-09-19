import { Result, Button } from 'antd';
import { ButtonLabels } from '../../constants/constants';
import { handleRetry } from '../../utils/utils';

const ErrorBoundary = () => {
  const handleClick = () => {
    handleRetry();
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Something went wrong on the server."
      extra={
        <Button type="primary" onClick={handleClick}>
          {ButtonLabels.RETRY}
        </Button>
      }
    />
  );
};

export default ErrorBoundary;
