import { useNavigate } from 'react-router-dom';

export const useHandleBack = () => {
  const navigate = useNavigate();
  
  const handleBack = (url) => {
    navigate(url);
  };

  return handleBack;
};
