import {useRouter} from "next/router";
import {Button, Form, Input} from "antd";
import {useState} from "react";
import BaseLayout from "../containers/BaseLayout";
import {addDoc, collection, getFirestore} from "firebase/firestore/lite";
import firebaseApp from "../../net/firebaseApp";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {DateTime} from "luxon";
import uid from "tiny-uid";

// portfolio 작성 폼 컴포넌트
export default function PortfolioForm() {
    const router = useRouter()
    const [form] = Form.useForm()
    const [thumbnail, setThumbnail] = useState('')

    return (
        <BaseLayout>
            <Form form={form} layout="vertical" onFinish={(values) => {
                // firebase db 객체 생성
                const firebaseDb = getFirestore(firebaseApp)
                // firebase db의 collection 객체 생성
                const portfolioList = collection(firebaseDb, 'portfolioList')
                console.log(values)
                // firebase db에 데이터 넣기
                addDoc(portfolioList,
                    {
                        ...values,
                        thumbnail,
                        created_at: new Date(),
                        updated_at: new Date()
                    })
                    .
                    then(() => router.push('/portfolio'))
                    .catch(console.warn)
            }}>
                <Form.Item label='이미지' required>
                    {/* 파일 업로드 창이 안뜰경우에는 크롬 브라우저 업데이트 여부 확인 */}
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
                        // 비동기 처리로 인한 null 주의
                        setThumbnail(url)
                        console.log(url)
                    }}/>
                    {thumbnail && (
                        <img src={thumbnail} style={{maxWidth: 200, maxHeight: 200}} alt='썸네일 이미지'/>
                    )}
                </Form.Item>

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