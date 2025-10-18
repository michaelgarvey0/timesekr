import { useNavigate } from 'react-router-dom';
export function useFrameworkNavigate() {
  const navigate = useNavigate();
  return navigate;
}
