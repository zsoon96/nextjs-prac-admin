import BaseLayout from "../../components/containers/BaseLayout";
import Link from "next/link";
import {Button} from "antd";
import {useEffect, useState} from "react";
import firebaseApp from '../../net/firebaseApp';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite'
import {DateTime} from "luxon";

function Items({portfolio}) {
    return (
        <li className='flex flex-row items-center py-2 border-b'>
            <div className='w-16'>
                <img src={portfolio.thumbnail} className='max-w-16 max-h-16' alt='썸네일 이미지'/>
            </div>
            <div className='flex-1 mx-2'>
                {portfolio.title}
            </div>
            <div>
                {/*{JSON.stringify(portfolio.created_at.seconds)}*/}
                {/*{DateTime.fromSeconds(portfolio.created_at.seconds).toFormat('yyyy-LL-dd')}*/}
            </div>
        </li>
    )
}

export default function PortfolioList() {
    const [portfolios, setPortfolios] = useState([])

    useEffect(() => {
        const firebaseDb = getFirestore(firebaseApp)
        const portfolios = collection(firebaseDb, 'portfolios')//.orderBy('created_at', 'desc')
        getDocs(portfolios).then((getDataSnapshot) => {
            // doc.data()를 통해 doc 데이터를 json으로 변환
            setPortfolios(getDataSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
        })
    }, [])

    return (
        <BaseLayout>
            <ul>
                {portfolios.map(portfolio => {
                    return <li key={portfolio.id}><Items portfolio={portfolio}/></li>
                })}
            </ul>
            <div className="flex flex-row justify-end">
                <Link href="/portfolio/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}