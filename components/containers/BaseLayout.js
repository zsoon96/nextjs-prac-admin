import React, {useEffect, useState} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {getAuth} from "firebase/auth";
import firebaseApp from "../../net/firebaseApp";
import {useRouter} from "next/router";
import SignIn from "../views/SignIn";
import Loading from "../views/Loading";

const { Header, Content, Sider } = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//     key,
//     label: `nav ${key}`,
// }));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

export default function BaseLayout( {children} ) {
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

    const router = useRouter()
    const auth = getAuth(firebaseApp)
    const [credential, setCredential] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        // onAuthStateChanged: 사용자 로그인 상태 체크하는 함수
        auth.onAuthStateChanged(credentials => {
            // 허용된 사용자만 로그인 유지
            if (credentials) {
                switch ( credentials?.email ) {
                    case "zsooon96@gmail.com":
                        setCredential(credentials)
                        // router.push('/')
                        break;
                    default:
                        alert('관리자만 로그인이 가능합니다.')
                }
            } else {
                setCredential(null)
            }
            setLoaded(true)
        })
    },[])

    if (!loaded) {
        return <Loading />
    }

    if (!credential) {
        return <SignIn />
    }

    return (
        <Layout style={{ minHeight:'100vh'}}>
            <Header className="header">
                <div className="logo" style={{
                    float: 'left',
                    width: 120,
                    height: 31,
                    margin: '16px 24px 16px 0',
                    background: 'rgba(255, 255, 255, 0.3)'
                }} />
                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />*/}
                <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <Menu.Item key="sign-out" onClick={()=>{
                        auth.signOut()
                    }}>로그아웃</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    width={200}
                    style={{
                        background: 'white',
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={items2}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                        background:'white'
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: 'white',
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
