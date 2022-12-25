import BaseLayout from "../../components/containers/BaseLayout";
import {Button, Form, Input} from 'antd';
import firebaseApp from '../../net/firebaseApp';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useRouter} from "next/router";
import uid from 'tiny-uid';
import {DateTime} from "luxon";

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

                <Form.Item label='이미지' required name="image">
                    <input type="file" onChange={async (e) => {
                        if (e.target.files.length === 0) return
                        // firebase storage 객체 생성
                        const storage = getStorage(firebaseApp);
                        const file = e.target.files[0]
                        const dir = DateTime.now().toFormat('yy/LL/')
                        const split = file.name.split('.')
                        const savePath = `/${dir}${encodeURIComponent(split[0])}-${uid()}.${split[1]}` // '/22/12/원본파일명-uid.확장자'
                        // 파일 경로 참조
                        const fileRef = ref(storage, savePath)
                        // firebase storage에 파일 업로드
                        await uploadBytes(fileRef, file)
                        // 다운로드 시 파일 url
                        const url = await getDownloadURL(fileRef)
                        console.log(url)
                    }}/>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">전송</Button>
                </Form.Item>
            </Form>
        </BaseLayout>
    )
}