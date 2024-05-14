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
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map(product => (
        <IonCard key={product.id}>
          <IonCardHeader>
            <IonCardTitle>{product.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Description: {product.description}</p>
            <p>Quantity: {product.quantity}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default ProductCards;
