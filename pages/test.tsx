import { motion } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDNQJam0Xcw_PlAepj2opposMx5RkKFDE",
  authDomain: "abel-pineiro.firebaseapp.com",
  projectId: "abel-pineiro",
  storageBucket: "abel-pineiro.appspot.com",
  messagingSenderId: "970040540323",
  appId: "1:970040540323:web:d28fdb9b0e599092695316",
  measurementId: "G-K0GKJS1FH2",
};

// export const getServerSideProps = async () => {
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   // const analytics = getAnalytics(app);
//   const db = getFirestore(app);

//   const artistRef = collection(db, "Artist");
//   const songRef = collectionGroup(db, "Song");

//   console.time("getDocs");
//   const querySnapshot = await getDocs(artistRef);
//   const songQuerySnapshot = await getDocs(songRef);
//   console.timeEnd("getDocs");

//   console.log(
//     songQuerySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//       artist: doc.raaaja,
//     }))
//   );

//   return {
//     props: {
//       artists: querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       })),
//       songs: songQuerySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         artist: doc.ref.parent.id,
//       })),
//     },
//   };
// };

const Test = () => {
  const [show, setShow] = React.useState(false);

  const getData = async () => {
    console.log("clicked");
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const artistRef = collection(db, "Artist");
    const songRef = collectionGroup(db, "Song");

    console.time("getDocs");
    const querySnapshot = await getDocs(artistRef);
    const songQuerySnapshot = await getDocs(songRef);
    console.timeEnd("getDocs");

    console.log(
      songQuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        artist: doc.data().artist.id,
      }))
    );
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="font-abel text-7xl">This is test</h1>
      {/* {artists.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
          </div>
        );
      })}
      {songs.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
          </div>
        );
      })} */}
      <button onClick={getData}>Show</button>
    </div>
  );
};

export default Test;
