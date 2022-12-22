import {Button} from "antd";
import firebaseApp from '../../net/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {useRouter} from "next/router";

export default function SignIn() {
    const router = useRouter();

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
                // 팝업창을 통해 인증 진행
                try {
                    const result = await signInWithPopup(auth, provider)
                    const { email } = result.user;
                    switch ( email ) {
                        case "zsooon96@gmail.com":
                            router.push('/')
                            break;
                        default:
                            alert('관리자만 로그인이 가능합니다.')
                    }
                } catch(err) {
                    console.warn(err)
                }
            }}>로그인</Button>
        </div>
    )
}