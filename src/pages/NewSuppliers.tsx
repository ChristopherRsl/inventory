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
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Menu from "../components/Menu";
import { ban, camera, checkmark } from "ionicons/icons";
import { useRef, useState } from "react";
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NewSuppliers: React.FC = () => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [notes, setNotes] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState<string>();

  const handleAddSuppliers = async () => {

    try {
      if (!name || !type) {
        setError("Please fill all the forms");

        return;
      }

      onAuthStateChanged(auth, async(user) => {
        if (user) {
          const uid = user.uid;
          await addDoc(collection(db, "suppliers", uid!, "mySuppliers"), {
            name,
            type,
            email,
            noTelp,
            notes,
            bankAcc
          });
          setName("");
          setType("");
          setEmail("");
          setNoTelp("");
          setNotes("");
          setBankAcc("");
          console.log("Product added successfully");
          setIsOpen(true);
        } else {
          console.log("ta");
        }
      });

      
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const clearError = () => {
    setError("");
  };
  return (
    <>
      <Menu></Menu>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      ></IonAlert>
      <IonToast
        isOpen={isOpen}
        message="Item Added Successfuly"
        onDidDismiss={() => setIsOpen(false)}
        duration={5000}
      ></IonToast>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Add Suppliers</IonTitle>
            <IonButton
              slot="end"
              expand="block"
              color="success"
              fill="clear"
              onClick={handleAddSuppliers}
            >
              <IonIcon icon={checkmark} size="large"></IonIcon>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Supplier Name</IonLabel>
                    <IonInput
                      placeholder="Supplier Name"
                      value={name}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setName(e.detail.value!)}
                    ></IonInput>
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Supplier Type</IonLabel>
                    <IonInput
                      placeholder="Supplier Type"
                      value={type}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setType(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">E-mail</IonLabel>
                    <IonInput
                      placeholder="E-mail"
                      value={email}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">No Telpon</IonLabel>
                    <IonInput
                      placeholder="No Telpon"
                      value={noTelp}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setNoTelp(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Notes</IonLabel>
                    <IonInput
                      placeholder="Notes"
                      value={notes}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setNotes(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Rekening Bank</IonLabel>
                    <IonInput
                      placeholder="Rekening Bank"
                      value={bankAcc}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setBankAcc(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default NewSuppliers;
