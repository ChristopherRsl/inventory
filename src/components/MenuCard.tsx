import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { cube, documentText } from "ionicons/icons";
import "./MenuCard.css";

export default function MenuCard({
  name,
  icon,
  route,
}: {
  name: string;
  icon: string;
  route: string;
}) {
  return (
    <IonCard button routerLink={route}>
      <IonCardHeader className="icon-centered">
        <IonIcon size="large" icon={icon} />
      </IonCardHeader>
      <IonCardContent className="ion-align-center ion-padding">
        <IonCardTitle className="ion-text-center">{name}</IonCardTitle>
      </IonCardContent>
    </IonCard>
  );
}
