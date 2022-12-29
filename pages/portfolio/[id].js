import firebaseApp from "../../net/firebaseApp";
import {doc, getDoc, getFirestore} from "firebase/firestore/lite";
import PortfolioForm from "../../components/views/PortfoliloForm";

export default function Page({id, portfolio}) {
    return <PortfolioForm id = {id} portfolio = {portfolio} />
}

export const getServerSideProps = async ({params}) => {
    const {id} = params

    // 데이터 페칭
    // firestore 연동
    const firebaseDb = getFirestore(firebaseApp)
    // 페칭하고자하는 컬렉션 참조
    const docRef = doc( firebaseDb, 'portfolioList', id)
    // 단일 데이터 가져오기
    const portfolio = await getDoc(docRef)
    // timestamp 타입의 필드 제거 후 전달
    const data = portfolio.data()
    delete data.created_at
    delete data.updated_at

    return {
        props: {
            id,
            portfolio: {
                id: portfolio.id,
                created_at: null,
                updated_at: null,
                ...data
            }
        }
    }
}