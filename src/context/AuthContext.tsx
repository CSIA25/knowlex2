import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, createInitialUserData, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isSuperadmin: boolean;
  isFather: boolean; // <-- Add new role state
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isSuperadmin: false, isFather: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [isFather, setIsFather] = useState(false); // <-- Add new state for father role

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        // User is logged out, reset all roles
        setIsSuperadmin(false);
        setIsFather(false); // <-- Reset father state
        setLoading(false);
      }
    });
    
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      // Listen for real-time changes to the user's role
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // Set roles based on the 'role' field in Firestore
          setIsSuperadmin(userData.role === 'superadmin');
          setIsFather(userData.role === 'father'); // <-- Check for the 'father' role
        } else {
          // This case handles a new user sign-up
           createInitialUserData(user.uid, user.email || '');
        }
        setLoading(false);
      });
      return () => unsubscribeFirestore();
    }
  }, [user]);


  const value = { user, loading, isSuperadmin, isFather }; // <-- Add isFather to context

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};