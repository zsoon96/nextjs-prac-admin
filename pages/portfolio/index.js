import BaseLayout from "../../components/containers/BaseLayout";
import Link from "next/link";
import {Button} from "antd";

export default function PortfolioList () {
    return (
        <BaseLayout>
            포트폴리오 리스트폼

            <div className="flex flex-row justify-end">
                <Link href="/portfolio/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}