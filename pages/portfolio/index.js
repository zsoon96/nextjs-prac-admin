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
                {/* Firebase Storage 접근 권한 이슈 시, storage rules 설정 변경 */}
                {/* 참고: https://ohmh.tistory.com/17 */}
                <img src={portfolio.thumbnail} className='max-w-16 max-h-16' alt='썸네일 이미지'/>
            </div>
            <div className='flex-1 mx-2'>
                <Link href={`/portfolio/${portfolio.id}`}>
                    {portfolio.title}
                </Link>
            </div>
            <div>
                {/*{JSON.stringify(portfolio.created_at.seconds)}*/}
                {DateTime.fromSeconds(portfolio.created_at.seconds).toFormat('yyyy-LL-dd')}
            </div>
        </li>
    )
}

export default function PortfolioList() {
    const [portfolios, setPortfolios] = useState([])

    useEffect(() => {
        const firebaseDb = getFirestore(firebaseApp)
        const portfolioList = collection(firebaseDb, 'portfolioList')//.orderBy('created_at', 'desc')
        getDocs(portfolioList).then((getDataSnapshot) => {
            // doc.data()를 통해 doc 데이터를 json으로 변환
            setPortfolios(
                getDataSnapshot.docs
                    .map(doc => ({id: doc.id, ...doc.data()}))
                    // 생성일로 비교해서 정렬
                    .sort((x, y) => x.created_at.seconds < y.created_at.seconds ? 1 : -1));
        })
    }, [])

    return (
        <BaseLayout>
            <ul>
                {portfolios.map(portfolio => {
                    return <Items key={portfolio.id} portfolio={portfolio}/>
                })}
            </ul>
            <div className="flex flex-row justify-end pt-4">
                <Link href="/portfolio/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}