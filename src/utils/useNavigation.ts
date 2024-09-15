import { useNavigate } from 'react-router-dom';

interface UseNavigationReturn {
  handleGoHome: () => void;
}

const useNavigation = (): UseNavigationReturn => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return { handleGoHome };
};

export default useNavigation;
