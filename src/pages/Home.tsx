import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

import { IonReactRouter } from "@ionic/react-router";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer />
        </IonContent>
        <IonTabs>
          <IonRouterOutlet></IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </IonPage>
  );
};

export default Home;
