import React from "react";
import {
  
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonIcon,
} from "@ionic/react";
import NewProduct from "../pages/NewProduct";
import { db } from "../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "@firebase/storage";
import { trash, trashBin } from "ionicons/icons";

export default function ProductCards() {
  const auth = getAuth();
  const storage = getStorage();

  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const querySnapshot = await getDocs(
          collection(db, "products", uid!, "myProduct")
        );

        const productsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const productData: any = {
              id: doc.id,
              ...doc.data(),
            };

            try {
              const storageRef = ref(
                storage,
                `images/${uid}/${doc.data().name}`
              );
              const downloadURL = await getDownloadURL(storageRef);
              productData.imageUrl = downloadURL;
            } catch {
              productData.imageUrl = "notwork";
            }

            return productData;
          })
        );

        setProducts(productsData);
      } else {
        console.log("ta");
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          await deleteDoc(doc(db, "products", uid!, "myProduct", id));
          setProducts(products.filter((product) => product.id !== id));
        } else {
          console.log("ta");
        }
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <>
      {products.length !== 0 ? (
        products.map((product) => (
          <IonCard
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              maxHeight: "150px",
            }}
          >
            <img
              // src="public/assets/No-Image.png"
              src={
                product.imageUrl !== "notwork"
                  ? product.imageUrl
                  : "public/assets/No-Image.png"
              }
              alt=""
              style={{ width: 150, height: 150 }}
            />
            <IonCol>
              <IonCardHeader>
                <IonCardTitle
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {product.name}{" "}
                  <IonButton
                    size="small"
                    color="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <IonIcon icon={trashBin} slot="icon-only"></IonIcon>
                  </IonButton>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Description: {product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Measurement: {product.uom}</p>
              </IonCardContent>
            </IonCol>
          </IonCard>
        ))
      ) : (
        <>
          <h1>no products stored</h1>
        </>
      )}
    </>
  );
}
