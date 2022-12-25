import BaseLayout from "../../components/containers/BaseLayout";
import Link from "next/link";
import {Button} from "antd";
import {useEffect, useState} from "react";
import firebaseApp from '../../net/firebaseApp';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export default function PortfolioList () {
    const [portfolios, setPortfolios] = useState([])

    useEffect(()=> {
        const firebaseDb = getFirestore(firebaseApp)
        const portfolios = collection( firebaseDb, 'portfolios')//.orderBy('created_at', 'desc')
        getDocs(portfolios).then((getDataSnapshot) => {
            // doc.data()를 통해 doc 데이터를 json으로 변환
            setPortfolios(getDataSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
        })
    },[])

    return (
        <BaseLayout>
            <ul>
                {portfolios.map(portfolio => {
                    return <li key={portfolio.id}>{portfolio.title}</li>
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