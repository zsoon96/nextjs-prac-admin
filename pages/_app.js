import Head from "next/head";
import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css'

function MyApp({Component, pageProps}) {
    return <>
    <Head>
        <title>Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </Head>
    <Component {...pageProps} />
</>
}

export default MyApp
