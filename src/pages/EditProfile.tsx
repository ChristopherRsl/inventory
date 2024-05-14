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
  import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
  
  const EditProfile: React.FC = () => {
    const nameInputRef = useRef<HTMLIonInputElement>(null);
    const descriptionInputRef = useRef<HTMLIonInputElement>(null);
    const quantityInputRef = useRef<HTMLIonInputElement>(null);
    const imageInputRef = useRef<HTMLIonInputElement>(null);
  
    const [error, setError] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [takenPhoto, setTakenPhoto] = useState<{
      path: string;
      preview: string;
    }>();
  
    const handleEditProfile = () => {
      const productName = nameInputRef.current!.value;
      const productDescription = descriptionInputRef.current!.value;
  
      if (!productName || !productDescription ) {
        setError("Please fill all the forms");
  
        return;
      }
  
      console.log(productName);
    };
  
    const takePhotoHandler = async () => {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        allowEditing: true,
        quality: 90,
        width: 500,
      });
      console.log(image);
  
      if (!image  || !image.webPath) {
        return;
      }
  
      setTakenPhoto({
        path: image.format,
        preview: image.webPath,
      });
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
              <IonTitle>Add Product</IonTitle>
              <IonButton
                slot="end"
                expand="block"
                color="success"
                fill="clear"
                onClick={handleEditProfile}
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
                      <IonLabel position="floating">Profile Name</IonLabel>
                      <IonInput
                        ref={nameInputRef}
                        placeholder="Product name"
                        type="text"
                        labelPlacement="stacked"
                        fill="solid"
                      ></IonInput>
                    </IonGrid>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      <IonLabel position="floating">Description</IonLabel>
                      <IonInput
                        ref={descriptionInputRef}
                        placeholder="Description"
                        type="text"
                        labelPlacement="stacked"
                        fill="solid"
                      />
                    </IonGrid>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonGrid>
                      <IonLabel position="floating">Profile Picture</IonLabel>
                      <IonCol>
                        <IonRow>
                          
                          {takenPhoto ? (
                            <img src={takenPhoto.preview} alt="Preview" />
                          ):(<><h2>no photo taken</h2></>)}
                        </IonRow>
                      </IonCol>
                    </IonGrid>
                  </IonCol>
                </IonRow>
  
                <IonRow>
                  <IonCol>
                    <IonRow className="ion-margin-top">
                      <IonCol className="ion-text-center">
                        <IonButton fill="outline" onClick={takePhotoHandler}>
                          <IonIcon slot="start" icon={camera}></IonIcon>
                          <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonToast
                      isOpen={isOpen}
                      message="Register Successfull"
                      onDidDismiss={() => setIsOpen(false)}
                      duration={5000}
                    ></IonToast>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default EditProfile;
  