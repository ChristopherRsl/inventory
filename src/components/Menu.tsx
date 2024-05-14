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
  person,
  people,
  logOut
} from "ionicons/icons";
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

export default function Menu() {
  const auth = getAuth();
  const history = useHistory();
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

    const handleLogout = async () => {
      try {
        await signOut(auth);
        history.push('/login'); 
      } catch (error) {
        console.error('Error logging out:', error);
      }
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
              <IonItem button routerLink="/suppliers">
                <IonIcon slot="start" icon={people}></IonIcon>
                <IonLabel>Suppliers</IonLabel>
              </IonItem>
              <IonItem button routerLink="/profile">
                <IonIcon slot="start" icon={person}></IonIcon>
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem button routerLink="/add">
                <IonIcon slot="start" icon={bagAdd}></IonIcon>
                <IonLabel>Add</IonLabel>
              </IonItem>
              <IonItem button routerLink="/remove">
                <IonIcon slot="start" icon={bagRemove}></IonIcon>
                <IonLabel>Remove</IonLabel>
              </IonItem>

              <IonItem button onClick={handleLogout}>
                <IonIcon slot="start" icon={logOut}></IonIcon>
                <IonLabel>Log Out</IonLabel>
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
