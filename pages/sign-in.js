import {Button} from "antd";
import firebaseApp from '../net/firebaseApp'
import { getAuth } from 'firebase/auth';

// firebase에서 제공하는 auth 기능 사용 (구글 로그인)
const auth = getAuth(firebaseApp)

export default function SignIn() {
    return (
        <div className=" flex justify-center items-center h-screen">
            <Button>로그인</Button>
        </div>
    )
}