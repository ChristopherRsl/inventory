import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonLoading,
} from "@ionic/react";
import Menu from "../components/Menu";
import { personAdd } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config"; // Import your firebaseConfig

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchProfile(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    setLoading(true);
    const profileDoc = await getDoc(doc(db, "profiles", userId));
    if (profileDoc.exists()) {
      setProfile(profileDoc.data() as { name: string; email: string });
    }
    setLoading(false);
  };

  return (
    <>
      <Menu></Menu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel>Name: {profile.name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Email: {profile.email}</IonLabel>
          </IonItem>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton routerLink="/editprofile">
              <IonIcon icon={personAdd}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonLoading isOpen={loading} message={"Please wait..."} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
