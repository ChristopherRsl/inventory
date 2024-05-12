import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

export default function ProductCard() {
  return (
    <IonCard>
      <IonCardHeader className="icon-centered">
       product
      </IonCardHeader>
      <IonCardContent className="ion-align-center ion-padding">
        <IonCardTitle className="ion-text-center">content</IonCardTitle>
      </IonCardContent>
    </IonCard>
  );
}
