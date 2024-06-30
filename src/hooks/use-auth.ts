'use client';

import { useEffect, useState } from 'react';
import { me } from '@/utils/handle-auth';
import { User } from '@supabase/supabase-js';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    me()
      .then((data) => setUser(data.data.user))
      .catch(console.error);
  });

  return user;
};

export default useAuth;
