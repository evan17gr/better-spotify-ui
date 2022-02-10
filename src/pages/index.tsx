import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apiInstance from '../axios';
import styles from '../styles/Home.module.css';
import { useAuth } from './AuthProvider';

export default function HomePage() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const { setAccessToken, login, token } = useAuth();

  const fetchUserData = async (bearerToken: string) => {
    try {
      const { data } = await apiInstance.get('/user/profile', {
        headers: { Authorization: 'Bearer ' + bearerToken },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const { access_token } = router.query;
      if (access_token && typeof access_token === 'string') {
        login();
        setAccessToken(access_token);
        fetchUserData(access_token);
      } else {
        fetchUserData(token);
      }
    }
  }, [router.isReady]);

  return (
    <main>
      <h1>Hello World!</h1>
    </main>
  );
}
