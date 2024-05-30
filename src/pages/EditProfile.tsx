import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Menu from "../components/Menu";
import { camera, checkmark } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config"; // Import your firebaseConfig

const EditProfile: React.FC = () => {
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

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
      const profileData = profileDoc.data();
      if (nameInputRef.current) nameInputRef.current.value = profileData.name;
      if (emailInputRef.current) emailInputRef.current.value = profileData.email;
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;

    if (!name || !email) {
      setError("Please fill all the forms");
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, "profiles", user.uid), { name, email });
      setShowToast(true);
    } catch (error) {
      setError("Failed to save profile");
    }
    setLoading(false);
  };

  const takePhotoHandler = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 90,
      width: 500,
    });

    if (!image || !image.webPath) {
      return;
    }

    setTakenPhoto({
      path: image.format,
      preview: image.webPath,
    });
  };

  const clearError = () => {
    setError(undefined);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput ref={nameInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput ref={emailInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={takePhotoHandler}>
                <IonIcon slot="start" icon={camera} />
                Take Photo
              </IonButton>
            </IonCol>
          </IonRow>
          {takenPhoto && (
            <IonRow>
              <IonCol>
                <img src={takenPhoto.preview} alt="Profile" />
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSaveProfile}>
                <IonIcon slot="start" icon={checkmark} />
                Save Profile
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading isOpen={loading} message={"Please wait..."} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Profile updated"
          duration={2000}
        />
        {error && (
          <IonAlert
            isOpen={!!error}
            onDidDismiss={clearError}
            header={"Error"}
            message={error}
            buttons={["OK"]}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
