import { doc } from "firebase/firestore";
import { firestore } from "./firebaseConfig";

export const screenDocRef = doc(firestore, "screens", "doc1");
