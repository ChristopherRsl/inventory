import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import NewProduct from "../pages/NewProduct";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

export default function ProductCards() {
  const auth = getAuth();

  const [uid, setUid] = useState<string>();
  const [products, setProducts] = useState<any[]>([]);

  const currentUserHandler = async () => {
    onAuthStateChanged(auth,async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUid(uid);
        const querySnapshot = await getDocs(
          collection(db, "products", uid!, "myProduct")
        );
    
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } else {
        console.log("ta");
      }
    });
  };

  const fetchProducts = async () => {
    console.log(uid);
    const querySnapshot = await getDocs(
      collection(db, "products", uid!, "myProduct")
    );

    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsData);
  };

  useEffect(() => {
    currentUserHandler();
    // fetchProducts();
  }, []);

  return (
    <>
      {products.map((product) => (
        <IonCard key={product.id}>
          <IonCardHeader>
            <IonCardTitle>{product.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Measurement: {product.uom}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
}
