import BaseLayout from "../../components/containers/BaseLayout";
import {Button, Form, Input} from 'antd'

export default function PortfolioForm() {
    const [form] = Form.useForm()
    return (
        <BaseLayout>
            <Form form={form} layout="vertical" onFinish={(values) => {
                console.log(values)
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