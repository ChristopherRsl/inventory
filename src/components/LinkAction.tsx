import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

export default function LinkAction({
  
    message,
    link,
  }: {
    
    message: string;
    link: string;
  }) {
  return (
    <>
      <IonRow className="ion-text-center ion-justify-content-center">
        <IonCol size="12">
          <p>
            {message}
            <IonRouterLink  routerLink={link}>
              {" "}
               &rarr;
            </IonRouterLink>
          </p>
        </IonCol>
      </IonRow>
    </>
  );
}
