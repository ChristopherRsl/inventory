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
  import { camera, checkmark } from "ionicons/icons";
  import { useRef, useState } from "react";
  import { db } from "../firebase.config";
  import { addDoc, collection } from "firebase/firestore";
  
  const NewSuppliers: React.FC = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
  
    const [error, setError] = useState<string>();
    
  
    const handleAddSuppliers = async () => {
      try {
        await addDoc(collection(db,"suppliers"),{
          name,
          type,
        });
        setName('');
        setType('');
        console.log('Product added successfully');
      } catch (error) {
        console.error('Error adding product: ', error);
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
              </IonCol>
            </IonRow>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default NewSuppliers;
  