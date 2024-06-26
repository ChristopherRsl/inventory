import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import Menu from "../components/Menu";
import { add, cube, cubeOutline } from "ionicons/icons";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Product: React.FC = () => {
  const auth = getAuth();

  const [uid, setUid] = useState<string>();

  useEffect(() => {
    currentUserHandler();
  }, []);

  const currentUserHandler = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      } else {
        console.log("ta");
      }
    });
  };
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  return (
    <>
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
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <ProductCard></ProductCard>

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton routerLink="/newproduct">
              <IonIcon icon={cubeOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Product;
