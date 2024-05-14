import React from "react";
import {
  IonButton,
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
import { deleteDoc, doc } from "firebase/firestore";

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

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(product => product.id !== id));
    } catch (error)
    {
      console.error('Error deleting product: ', error)
    }
  }

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
            <IonButton color={"danger"} slot="end" onClick={() => handleDelete(product.id)}>
              Delete
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default ProductCards;
