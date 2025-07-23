"use client"

import FooterBannar from "@/components/footerBannar"
import BannerSection from "@/components/homeHeaders/BannerSection"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditions() {
    return (
        <div>
            <BannerSection image={'/password.jpg'} title="Terms & Conditions" description="Here are the products you've saved. You can remove items or contact us to learn more." />
            <div className="container mx-auto  p-6 text-sm leading-relaxed text-gray-700 space-y-6  rounded-lg">
                <ScrollArea className="h-[100vh] p-4">
                    <h1 className="text-2xl font-semibold mb-4">Terms & Conditions</h1>

                    <p>
                        Welcome to Dipsway! By accessing and using our website dipsway.com and purchasing our products, you agree to comply with and be bound by the following terms and conditions. Please read these Terms carefully. If you do not agree with these Terms, please do not use our platform.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Eligibility</h2>
                    <p>
                        You must be at least 18 years old and legally able to enter into contracts to use our Site. By using the Site, you represent and warrant that you meet these eligibility requirements.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Account Registration</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>You must create an account to place bids or make purchases.</li>
                        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                        <li>You agree to provide accurate and current information when creating your account.</li>
                    </ul>

                    <h2 className="font-semibold text-lg mt-6">Auctions & Bidding</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Each product listed on our site can be auctioned in real-time or scheduled batches, depending on the product type. You can place bids on items listed by following the bid procedures.</li>
                        <li>Bidding Rules: Placing a bid means you are making a binding offer to purchase the item. If you are the highest bidder when the auction ends, you are obligated to purchase the product at the bid price.</li>
                        <li>Bid Cancellation: Once a bid is placed, it cannot be canceled or withdrawn. If you win the product&apos;s auction, you are obliged to pay the final amount.</li>
                    </ul>

                    <h2 className="font-semibold text-lg mt-6">Winning Bid and Payment</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>If you win an auction, you are required to pay the final amount plus any applicable taxes, fees, and shipping costs. Payment must be made through the available payment methods on the Site.</li>
                        <li>Failure to complete the payment within the specified time may result in the cancellation of the transaction, and you may be subject to penalties, including account suspension.</li>
                    </ul>

                    <h2 className="font-semibold text-lg mt-6">Fees</h2>
                    <p>
                        We may charge fees when you register or when you list or sell items for auction or sale. These fees are stated on the fee schedule available on our Site.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Seller Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Accurately represent the condition, description, and authenticity of the items they list for auction or sale, including clear details on condition, defects, or damages if applicable.</li>
                        <li>Maintain possession and responsibility for shipping the item to the winning bidder in a timely and secure manner.</li>
                        <li>Unauthorized, deceptive, or fraudulent auctions are strictly prohibited and may be subject to enforcement or legal action.</li>
                    </ul>

                    <h2 className="font-semibold text-lg mt-6">Prohibited Activities</h2>
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Use the Site for any unlawful purpose.</li>
                        <li>Post or upload false, misleading, or defamatory listings.</li>
                        <li>Manipulate bidding, use shill bidding, bots, or cheating methods to manipulate the auction outcomes, or misrepresenting items for sale.</li>
                        <li>Interfere with other users’ use of the platform.</li>
                    </ul>

                    <h2 className="font-semibold text-lg mt-6">Intellectual Property</h2>
                    <p>
                        All content on the Site, including text, graphics, logos, images, and software, is the property of Dipsway (or its licensors) and is protected by intellectual property laws. You may not reproduce, distribute, or use our trademarks without express written permission.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Privacy</h2>
                    <p>
                        Your use of the Site is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, Dipsway (and its team) are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Dispute Resolution</h2>
                    <p>
                        Any dispute arising from these Terms and your use of our Site will be resolved through negotiation, mediation, or arbitration in accordance with the laws of [Your Country/State]. You agree to waive any right to a jury trial or to participate in class actions.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend your access to the Site at our discretion, without notice, for conduct that violates these Terms or that we believe is harmful to other users or our business.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Changes to These Terms</h2>
                    <p>
                        We may update these Terms at any time. The most current version will always be available on our page. By continuing to use the Site after changes are posted, you agree to be bound by the revised terms.
                    </p>

                    <h2 className="font-semibold text-lg mt-6">Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of [Your State/Country], and any legal action or proceeding related to these Terms shall be brought in a competent court located in [Jurisdiction].
                    </p>
                </ScrollArea>
            <FooterBannar/>
            </div>
        </div>
    )
}
