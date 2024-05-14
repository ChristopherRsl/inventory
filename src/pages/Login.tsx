import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "../firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import LinkAction from "../components/LinkAction";
import { arrowBack, logoGoogle, shapesOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export default function Login() {
  const auth = getAuth();
  const history = useHistory();

  const provider = new GoogleAuthProvider();
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const [error, setError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    currentUserHandler();
  }, []);

  const currentUserHandler = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid;
      } else {
        console.log("tidak ada user");
      }
    });
  };

  const login = () => {
    const userEmail = emailInputRef.current!.value;
    const userPassword = passwordInputRef.current!.value;

    if (!userEmail || !userPassword) {
      setError("Please fill all the forms");

      return;
    }

    signInWithEmailAndPassword(
      auth,
      userEmail as string,
      userPassword as string
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // setError("Login Berhasil");
        setIsOpen(true);
        history.push("/home");
      })
      .catch((err) => {
        const errorMsg = err.message;
        setError(errorMsg);
      });

    console.log(userEmail, userPassword);
  };
  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;

        const user = result.user;
        console.log(result);
        setIsOpen(true);
        history.push("/home");
      })
      .catch((err) => {
        const email = err.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
        const errorMsg = err.message;
        setError(errorMsg);
      });
  };

  const clearError = () => {
    setError("");
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      ></IonAlert>

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start">Inventory</IonTitle>
            <IonButtons slot="end">
              <IonButton className="custom-button">
                <IonIcon icon={shapesOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="12">
                <IonCardTitle>Login</IonCardTitle>
                <h5>Welcome back, hope you're doing well</h5>
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top ion-padding-top">
              <IonCol size="12">
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      <IonLabel position="floating">Email</IonLabel>
                      <IonInput
                        ref={emailInputRef}
                        placeholder="email"
                        type="email"
                        labelPlacement="stacked"
                        fill="solid"
                      ></IonInput>
                    </IonGrid>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        ref={passwordInputRef}
                        placeholder="password"
                        type="password"
                        labelPlacement="stacked"
                        fill="solid"
                      />
                    </IonGrid>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonButton expand="block" color="success" onClick={login}>
                      Login
                    </IonButton>
                    <IonToast
                      isOpen={isOpen}
                      message="Login Successfull"
                      onDidDismiss={() => setIsOpen(false)}
                      duration={5000}
                    ></IonToast>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton
                      expand="block"
                      color="primary"
                      onClick={loginGoogle}
                    >
                      <IonIcon slot="start" icon={logoGoogle}></IonIcon>
                      Login With Google
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonFooter>
          <IonGrid className="ion-no-margin ion-no-padding">
            <LinkAction message="Signup" link="Signup"></LinkAction>
          </IonGrid>
        </IonFooter>
      </IonPage>
    </>
  );
}
