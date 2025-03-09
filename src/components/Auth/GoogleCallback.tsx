import { authService } from '@/apis/auth.service';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

export const GoogleCallback = () => {
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (code && !processedRef.current) {
        processedRef.current = true;

        try {
          const { accessToken, refreshToken } =
            await authService.googleLogin(code);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/');
        } catch (error) {
          console.error('Login failed:', error);
          navigate('/');
        }
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return <div>로그인 처리중</div>;
};
