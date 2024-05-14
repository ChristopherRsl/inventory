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
