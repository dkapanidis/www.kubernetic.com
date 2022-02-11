import Link from "next/link";
import { CheckboxIcon, GroupIcon, UserIcon } from "./Icons";

/**
 * Pricing Table section.
 * 
 * Section is in gray background, contains a table with two columns, for desktop and team pricing.
 * 
 * It has a footer with legal details (EUR contains a tooltip, terms-and-policies redirect to policy)
 */
export default function PricingTable() {
  return (
    <>
      <div id="pricing" className="bg-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center pb-20">
            <h2 className="mt-8 pt-20 text-3xl font-light sm:text-6xl sm:leading-tight">The right price for you</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-center pb-10">
            <PricingColumnIndividual />
            <PricingColumnTeam />
          </div>
          <div className="text-center italic font-light text-gray-700 text-sm pb-10">Prices listed in <span aria-label="Euro" data-balloon-pos="up" className="border-b border-gray-500 border-dotted">EUR</span>. Taxes may apply. By using Kubernetic you agree to our <a rel="noreferrer" target="_blank" href="https://harbur.io/privacy" className="border-b border-gray-500 border-dotted">terms and policies</a>.</div>
        </div>
      </div >
    </>
  )
}

/**
 * Pricing Column for Desktop License.
 */
function PricingColumnIndividual() {
  return (
    <div className="flex flex-col bg-white border-2 rounded-lg divide-y divide-gray-300">
      <PricingHeader title="Kubernetic Desktop" subtitle="A license for your machine" icon={<UserIcon />} />
      <div className="flex-1">
        <h2 className="p-4 text-left font-bold">
          <span className="text-md pl-2 font-bold">€ 60 / year</span>
        </h2>
        <ul className="p-4 pl-4 text-left font-bold">
          <PricingListItem
            title="The Desktop Client app"
            subtitle="The best companion to extend your CLI tooling with a Desktop UI." />
          <PricingListItem
            title="One year of app updates"
            subtitle="Stay up to date with new features and improvements." />
          <PricingListItem
            title="Multi-OS License"
            subtitle="Use your personal license on multiple machines at the same time." />
          <PricingListItem
            title="Unlimited Namespaces"
            subtitle="Split and manage your cluster(s) as you wish with multiple namespaces." />
          <PricingListItem
            title="Unlimited Clusters"
            subtitle="Use Kubernetic to manage one, five or thousands of clusters." />
          <PricingListItem
            title="Helm integration"
            subtitle="Use Kubernetic to manage helm charts and releases." />
        </ul>
      </div>
      <div className="py-6 px-10">
        <PricingButton to="/payment/checkout/personal" title="Buy Desktop License" />
      </div>
    </div>
  )
}

/**
 * Pricing column for Team License.
 */
function PricingColumnTeam() {
  return (
    <div className="flex flex-col bg-white border-2 rounded-lg divide-y divide-gray-300">
      <PricingHeader title="Kubernetic Team" subtitle="A subscription for the whole team" icon={<GroupIcon />} />
      <div className="flex-1">
        <h2 className="p-4 text-left font-bold">
          <span className="text-3xl">€ 34 per user / monthly</span>
        </h2>
        <ul className="p-4 pl-4 text-left font-bold">
          <PricingListItem
            title="On-premise deployment"
            subtitle="Kubernetic is deployed on-premise as web application." />
          <PricingListItem
            title="Single Sign On"
            subtitle="Support of Single Sign On." />
          <PricingListItem
            title="Multiple Users"
            subtitle="License seats can be assigned to users to grant access for sign-in." />
          <PricingListItem
            title="Unlimited Namespaces"
            subtitle="Split and manage your cluster(s) as you wish with multiple namespaces." />
          <PricingListItem
            title="Unlimited Clusters"
            subtitle="Use Kubernetic to manage one, five or thousands of clusters." />
          <PricingListItem
            title="Helm integration"
            subtitle="Use Kubernetic to manage helm charts and releases." />
          <PricingListItem
            title="Operators integration"
            subtitle="Install and manage day-2 operations of operators to your clusters." />
          <PricingListItem
            title="ArgoCD integration"
            subtitle="Perform GitOps Continuous Delivery (CD) using ArgoCD applications." />
          <PricingListItem
            title="TektonCD integration"
            subtitle="Continuously Build (CI) your apps using TektonCD Pipelines." />
        </ul>
      </div>
      <div className="py-6 px-10">
        <PricingButton to="/team/trial" title="Start a 30-day trial" />
      </div>
    </div>
  )
}

/**
 * Header on a Pricing table column.
 * 
 * @param title The main text.
 * @param subtitle A subtitle description.
 * @param icon An descriptive icon to the right side.
 */
type PricingHeaderProps = { title: string, subtitle: string, icon: any }
function PricingHeader({ title, subtitle, icon }: PricingHeaderProps) {
  return (
    <div className="flex relative">
      <div className="w-10/12 text-left px-5 py-10">
        <h3 className="mt-2 text-xl font-bold sm:leading-tight">{title}</h3>
        <h3 className="text-lg font-extralight sm:leading-tight">{subtitle}</h3>
      </div>
      <div className="grid w-2/12 text-blue-500 p-4 content-center">
        {icon}
      </div>
    </div>
  )
}

/**
 * List item on a Pricing table column.
 *
 * @param title The main text.
 * @param subtitle A subtitle description.
 */
type PricingListItemProps = { title: string, subtitle: string }
function PricingListItem({ title, subtitle }: PricingListItemProps) {
  return (
    <li className="pb-3 pl-8 relative">
      <CheckboxIcon /> {title}<br />
      <span className="font-extralight">{subtitle}</span>
    </li>
  )
}

/**
 * Pricing button on a Pricing table column.
 * 
 * Button is stretched to fit screen.
 * 
 * TODO: analytics label and to link.
 * 
 * @param title The main text.
 */
type PricingButtonProps = { to: string, title: string }
function PricingButton({ to, title }: PricingButtonProps) {
  return (
    <Link href={to}>
      <a className="btn btn-blue btn-popup inline-flex rounded py-3 w-full">
        <span>{title}</span>
      </a>
    </Link>
  )
}