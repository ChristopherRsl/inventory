import React from "react";
import {
  IonButton,
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SupplierCards: React.FC = () => {
  const auth = getAuth();

  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const querySnapshot = await getDocs(
            collection(db, "suppliers", uid!, "mySuppliers")
          );
          const suppliersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSuppliers(suppliersData);
        } else {
          console.log("ta");
        }
      });
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          await deleteDoc(doc(db, "suppliers", uid!, "mySuppliers",id));
          setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        } else {
          console.log("ta");
        }
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <>
      {suppliers.map((supplier) => (
        <IonCard key={supplier.id}>
          <IonCardHeader>
            <IonCardTitle>{supplier.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Type: {supplier.type}</p>
            <p>Email: {supplier.email}</p>
            <p>Phone: {supplier.noTelp}</p>
            <p>Notes: {supplier.notes}</p>
            <p>Bank Account: {supplier.bankAcc}</p>
            <IonButton
              color={"danger"}
              slot="end"
              onClick={() => handleDelete(supplier.id)}
            >
              Delete
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default SupplierCards;
