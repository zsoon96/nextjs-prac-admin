import BaseLayout from "../../components/containers/BaseLayout";
import {Button, Form, Input} from 'antd'
import firebaseApp from '../../net/firebaseApp';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import {useRouter} from "next/router";

export default function PortfolioForm() {
    const router = useRouter()
    const [form] = Form.useForm()

    return (
        <BaseLayout>
            <Form form={form} layout="vertical" onFinish={ (values) => {
                // firebase db 객체 생성
                const firebaseDb = getFirestore(firebaseApp)
                // firebase db의 collection 객체 생성
                const portfolios = collection(firebaseDb, 'portfolios')
                // firebase db에 데이터 넣기
                addDoc(portfolios,
                    {...values,
                        created_at: new Date(),
                        updated_at: new Date()}
                )
                    .then(res => router.push('/portfolio'))
                    .catch(console.warn)
            }}>
                <Form.Item label='제목' required name="title">
                    <Input/>
                </Form.Item>

                <Form.Item label='내용' required name="content">
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">전송</Button>
                </Form.Item>
            </Form>
        </BaseLayout>
    )
}