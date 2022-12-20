import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase-credential.json'

// firebase 앱 연동 설정 (재사용을 위한 파일 분리)
const app = initializeApp(firebaseConfig)

export default app;