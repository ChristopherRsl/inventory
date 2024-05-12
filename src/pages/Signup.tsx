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
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import LinkAction from "../components/LinkAction";
import { arrowBack, shapesOutline } from "ionicons/icons";
import '../firebase.config'
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

export default function Signup() {
  const auth = getAuth()




  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);
  const repasswordInputRef = useRef<HTMLIonInputElement>(null);
  const [error, setError] = useState<string>();

  const signup = () => {
    const userEmail = emailInputRef.current!.value;
    const userPassword = passwordInputRef.current!.value;
    const userrePassword = repasswordInputRef.current!.value;

    if (!userEmail || !userPassword || !userrePassword) {
      setError("Please fill all the forms");

      return;
    }
    if (userPassword != userrePassword) {
      setError("Password did not match");

      return;
    }

    createUserWithEmailAndPassword(auth, userEmail as string, userPassword as string).then((userCredential)=>{

      const user = userCredential.user;
      setError("Register Berhasil");
    }).catch((err)=>{
      const errorMsg = err.message;
      setError(errorMsg);
    })

    console.log(userEmail, userPassword);
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
                <IonCardTitle>Signup</IonCardTitle>
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
                    <IonGrid>
                      <IonLabel position="floating">Confirm Password</IonLabel>
                      <IonInput
                        ref={repasswordInputRef}
                        placeholder="re-type password"
                        type="password"
                        labelPlacement="stacked"
                        fill="solid"
                      />
                    </IonGrid>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonButton expand="block" color="success" onClick={signup}>
                      Sign up
                    </IonButton>
                  </IonCol>
                </IonRow>
                
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonFooter>
          <IonGrid className="ion-no-margin ion-no-padding">
            <LinkAction message="Login" link="login"></LinkAction>
          </IonGrid>
        </IonFooter>
      </IonPage>
    </>
  );
}
