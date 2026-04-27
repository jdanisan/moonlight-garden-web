import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../../services/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);        // Firebase user
  const [userData, setUserData] = useState(null); // datos extra (role, name)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        //  traemos datos del usuario en Realtime Database
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          // si no existe aún en DB, creamos fallback básico
          setUserData({
            email: firebaseUser.email,
            role: "user",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,              // auth user (uid, email, etc.)
    userData,          // role, name, etc.
    loading,

    // helpers útiles
    isLogged: !!user,
    isAdmin: userData?.role === "admin",
  };
}