import { Result } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

const OfflineMessage = () => (
  <Result
    icon={<WifiOutlined style={{ color: '#FF4D4F' }} />}
    title="No Internet Connection"
    subTitle="It seems like you are offline. Please check your internet connection and try again."
  />
);

export default OfflineMessage;
