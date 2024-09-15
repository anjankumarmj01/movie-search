import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Favourites from '../components/Favourites/Favourites';
import { Layout } from 'antd';
import AppHeader from '../components/Header/AppHeader';
import '../components/App/AppLayout.css';

const { Content } = Layout;

const routes = [
  {
    path: '/',
    element: (
      <Layout className="app-layout">
        <AppHeader />
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <SearchPage />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
