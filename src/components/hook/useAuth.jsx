import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Añadido signOut
import { ref, get } from "firebase/database";
import { auth, db } from "../../services/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);       
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
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
    user,            
    userData,          
    loading,
    logout, 
    isLogged: !!user,
    isAdmin: userData?.role === "admin",
  };
}