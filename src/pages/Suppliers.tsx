import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import { add, cube, cubeOutline, personAdd } from 'ionicons/icons';
import ProductCard from '../components/ProductCard';
import SupplierCard from '../components/SupplierCard';

const Suppliers: React.FC = () => {
  return (<>
      <Menu></Menu>
   
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Suppliers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <SupplierCard></SupplierCard>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink='/newsuppliers'>
            <IonIcon icon={personAdd}></IonIcon>
          </IonFabButton>
          
        </IonFab>
        </IonContent>
      </IonPage>
  </>
    
  );
};

export default Suppliers;
