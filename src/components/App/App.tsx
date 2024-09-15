import AppRoutes from '../../routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
