import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import type { ToggleCustomEvent } from "@ionic/react";

import {
  bagAdd,
  bagRemove,
  cube,
  cubeOutline,
  documentText,
  documentTextOutline,
  duplicateOutline,
  home,
} from "ionicons/icons";

export default function Menu() {
    const [paletteToggle, setPaletteToggle] = useState(false);

    // Listen for the toggle check/uncheck to toggle the dark palette
    const toggleChange = (ev: ToggleCustomEvent) => {
      toggleDarkPalette(ev.detail.checked);
    };
  
    // Add or remove the "ion-palette-dark" class on the html element
    const toggleDarkPalette = (shouldAdd: boolean) => {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };
  
    // Check/uncheck the toggle and update the palette based on isDark
    const initializeDarkPalette = (isDark: boolean) => {
      setPaletteToggle(isDark);
      toggleDarkPalette(isDark);
    };
  
    useEffect(() => {
      // Use matchMedia to check the user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
      // Initialize the dark palette based on the initial
      // value of the prefers-color-scheme media query
      initializeDarkPalette(prefersDark.matches);
  
      // Listen for changes to the prefers-color-scheme media query
      prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));
    }, []);
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inventory</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/home">
                <IonIcon slot="start" icon={home}></IonIcon>
                <IonLabel>Home</IonLabel>
              </IonItem>
              <IonItem button routerLink="/product">
                <IonIcon slot="start" icon={cube}></IonIcon>
                <IonLabel>Products</IonLabel>
              </IonItem>
              <IonItem button routerLink="/document">
                <IonIcon slot="start" icon={documentText}></IonIcon>
                <IonLabel>Documents</IonLabel>
              </IonItem>
              <IonItem button routerLink="/add">
                <IonIcon slot="start" icon={bagAdd}></IonIcon>
                <IonLabel>Add</IonLabel>
              </IonItem>
              <IonItem button routerLink="/remove">
                <IonIcon slot="start" icon={bagRemove}></IonIcon>
                <IonLabel>Remove</IonLabel>
              </IonItem>

              <IonItem>
                <IonToggle
                  checked={paletteToggle}
                  onIonChange={toggleChange}
                  justify="space-between"
                >
                  Dark Mode
                </IonToggle>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
}
