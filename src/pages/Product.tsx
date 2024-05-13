import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import Menu from '../components/Menu';
import { add, cube, cubeOutline } from 'ionicons/icons';
import ProductCard from '../components/ProductCard';

const Product: React.FC = () => {
  return (<>
      <Menu></Menu>
   
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <ProductCard></ProductCard>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink='/newproduct'>
            <IonIcon icon={cubeOutline}></IonIcon>
          </IonFabButton>
          
        </IonFab>
        </IonContent>
      </IonPage>
  </>
    
  );
};

export default Product;
