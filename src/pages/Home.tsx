import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Menu from '../components/Menu';

const Home: React.FC = () => {
  return (<>
      <Menu></Menu>
   
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">HOMEHOMEHOMEHOME HOMEHOME HOMEHOME HOMEHOME</IonContent>
      </IonPage>
  </>
    
  );
};

export default Home;
