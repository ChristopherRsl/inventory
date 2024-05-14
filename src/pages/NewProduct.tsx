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
import { db } from "../firebase.config";
import { addDoc, collection } from "firebase/firestore";

const NewProduct: React.FC = () => {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();

  const handleAddProduct = async () => {
    try {

      if (!name || !description || !quantity) {
        setError("Please fill all the forms");
  
        return;
      }

      await addDoc(collection(db,"products"),{
        name,
        description,
        quantity: parseInt(quantity)
      });
      setName('');
      setDescription('');
      setQuantity('');
      console.log('Product added successfully');
      setIsOpen(true)
    } catch (error) {
      console.error('Error adding product: ', error);
    }
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
              onClick={handleAddProduct}
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
                    <IonLabel position="floating">Product Name</IonLabel>
                    <IonInput
                      placeholder="Product name"
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
                    <IonLabel position="floating">Description</IonLabel>
                    <IonInput
                      placeholder="Description"
                      value={description}
                      type="text"
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setDescription(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Quantity</IonLabel>
                    <IonInput
                      placeholder="Quantity"
                      type="number"
                      value={quantity}
                      labelPlacement="stacked"
                      fill="solid"
                      onIonChange={(e) => setQuantity(e.detail.value!)}
                    />
                  </IonGrid>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonLabel position="floating">Product Image</IonLabel>
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
                    message="Item Added Successfuly"
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

export default NewProduct;
