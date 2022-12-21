import {Button} from "antd";
import firebaseApp from '../net/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


export default function SignIn() {
    return (
        <div className=" flex justify-center items-center h-screen">
            <Button onClick={async () => {
                // firebase에서 제공하는 auth 기능 사용 (구글 로그인)
                const auth = getAuth(firebaseApp)
                // 인증 방식에 사용할 제공 업체 주입
                const provider = new GoogleAuthProvider()
                // 추가 정보 요청
                provider.addScope('profile')
                provider.addScope('email')
                // 인증 진행
                try {
                    const result = await signInWithPopup(auth, provider)
                    console.log(result)
                } catch(err) {
                    console.warn(err)
                }
            }}>로그인</Button>
        </div>
    )
}