import { Result, Button } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import { RETRY } from '../../constants/constants';
import { handleRetry } from '../../utils/utils';

const OfflineMessage = () => (
  <Result
    icon={<WifiOutlined style={{ color: '#FF4D4F' }} />}
    title="No Internet Connection"
    subTitle="It seems like you are offline. Please check your internet connection and try again."
    extra={
      <Button type="primary" onClick={handleRetry}>
        {RETRY}
      </Button>
    }
  />
);

export default OfflineMessage;
