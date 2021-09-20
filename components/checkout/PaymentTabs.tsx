import { BusinessCenter, Person } from "@material-ui/icons";
import Link from "next/link";

export default function PaymentTabs({ checkoutType }: { checkoutType: "personal" | "commercial" }) {
    return (
        <div className="flex gap-4 text-lg text-gray-400 border-b border-gray-200 select-none">
            <TabSection status="personal" checkoutType={checkoutType} title="For Individual Use" icon={<Person />} />
            <TabSection status="commercial" checkoutType={checkoutType} title="For Organizations" icon={<BusinessCenter />} />
        </div>
    )
}

type TabSectionProps = { status: string, title: string, icon: any, checkoutType: string }
function TabSection({ status, title, icon, checkoutType }: TabSectionProps) {
    return (
        <Link href={`/payment/checkout/${status}`}>
            <a className={`p-1 border-blue-500 cursor-pointer ${checkoutType === status ? "text-blue-500 border-b-2" : ""}`}>
                {icon} {title}
            </a>
        </Link>
    )
}


