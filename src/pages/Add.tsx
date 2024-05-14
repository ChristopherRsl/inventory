import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import ProductCards from '../components/ProductCard';

const Add: React.FC = () => {
  return (<>
      <Menu></Menu>
   
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Add Quantity</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <ProductCards></ProductCards>
        </IonContent>
      </IonPage>
  </>
    
  );
};

export default Add;
