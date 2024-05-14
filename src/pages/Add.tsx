import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';

const Add: React.FC = () => {
  return (<>
      <Menu></Menu>
   
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Add</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">ADD ADD ADD ADD </IonContent>
      </IonPage>
  </>
    
  );
};

export default Add;
