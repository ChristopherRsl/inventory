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

export default function Login() {
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const [error, setError] = useState<string>();


  const login = () => {
    const userEmail = emailInputRef.current!.value;
    const userPassword = passwordInputRef.current!.value;

    if (!userEmail || !userPassword) {
      setError("Please fill all the forms");

      return;
    }

    console.log(userEmail,userPassword);
  };
  const loginGoogle = () => {
    console.log("login google");
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
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton
                      expand="block"
                      color="primary"
                      onClick={loginGoogle}
                    >
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
