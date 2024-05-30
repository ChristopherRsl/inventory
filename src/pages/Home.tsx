import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import Menu from "../components/Menu";
import MenuCard from "../components/MenuCard";
import { home, person, pricetag, swapHorizontal } from "ionicons/icons";

export const MENU_DATA = [
  {
    name: "Product",
    icon: "cube",
    route: "product",
  },
  {
    name: "Suppliers",
    icon: "documentText",
    route: "suppliers",
  },
  {
    name: "Documents",
    icon: "bagAdd",
    route: "document",
  },
  {
    name: "Profile",
    icon: "bagRemove",
    route: "profile",
  },
];

const Home: React.FC = () => {
  return (
    <>
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
        <IonContent className="ion-padding">
          <div className="menu-grid">
            {MENU_DATA.map((item, index) => (
            <MenuCard key={index} {...item} />
          ))}
          </div>       
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
