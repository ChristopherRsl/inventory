import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

const SupplierCards: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const querySnapshot = await getDocs(collection(db, "suppliers"));
      const suppliersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSuppliers(suppliersData);
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "suppliers", id));
      setProducts(suppliers.filter(supplier => supplier.id !== id));
    } catch (error)
    {
      console.error('Error deleting product: ', error)
    }
  }

  return (
    <>
      {suppliers.map(supplier => (
        <IonCard key={supplier.id}>
          <IonCardHeader>
            <IonCardTitle>{supplier.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Type: {supplier.type}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default SupplierCards;
function setProducts(arg0: any) {
  throw new Error("Function not implemented.");
}

