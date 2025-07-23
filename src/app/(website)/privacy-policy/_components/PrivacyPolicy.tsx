"use client"

import FooterBannar from "@/components/footerBannar"
import BannerSection from "@/components/homeHeaders/BannerSection"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicy() {
  return (
    <div>
      <BannerSection image="/account.jpg" title="Privacy Policy" description="Here are the products you've saved. You can remove items or contact us to learn more." />
      <div className="max-w-4xl mx-auto p-6 text-sm leading-relaxed text-gray-700 space-y-6rounded-lg">
        <ScrollArea className="h-[80vh] p-4">
          <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
          <p>
            We value and respect your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website (dipsway.com) or make a purchase from us.
          </p>
          <p>
            By using our website, you agree to the practices described in this Privacy Policy. Please read it carefully to understand our views and practices regarding your personal data.
          </p>

          <h2 className="font-semibold text-lg mt-6">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Personal Information:</strong> When you register for an account, place a bid, or use certain features on our Site, we may collect your name, email address, phone number, billing address, shipping address, and payment details.
            </li>
            <li>
              <strong>Transaction Information:</strong> We collect details of your bidding activity, items purchased, and payment history.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about your interactions with the Site, including IP address, browser type, device type, pages visited, and time spent on the Site. This helps us improve user experience and optimize our services.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and other tracking technologies to enhance your experience and collect information about how you use our Site.
            </li>
          </ul>

          <h2 className="font-semibold text-lg mt-6">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain the auction services, including processing bids, managing payments, and shipping orders.</li>
            <li>Communicate with you about your account, bids, and purchases.</li>
            <li>Respond to customer service inquiries and resolve issues.</li>
            <li>Personalize your experience on our Site and recommend relevant products or auctions.</li>
            <li>Analyze and improve the performance and functionality of the Site.</li>
            <li>Ensure compliance with our terms of service, legal obligations, and prevent fraud.</li>
          </ul>

          <h2 className="font-semibold text-lg mt-6">How We Share Your Information</h2>
          <p>We may share your personal information in the following situations:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Service Providers:</strong> We may share your data with trusted third-party service providers who assist us in operating the Site, processing payments, and fulfilling orders. These providers are required to use your data solely for the purpose of providing services to us.
            </li>
            <li>
              <strong>Legal Obligations:</strong> We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of the transaction.
            </li>
          </ul>

          <h2 className="font-semibold text-lg mt-6">Data Security</h2>
          <p>
            We take the security of your personal information seriously and use industry-standard security measures to protect it. However, no data transmission over the internet is completely secure, and we cannot guarantee the absolute security of your information.
          </p>

          <h2 className="font-semibold text-lg mt-6">Your Data Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The right to access the personal information we hold about you.</li>
            <li>The right to correct any inaccuracies in your personal information.</li>
            <li>The right to delete your personal information, subject to legal and contractual obligations.</li>
            <li>The right to withdraw consent where we process data based on consent.</li>
            <li>The right to opt-out of marketing communications.</li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact us at <a href="mailto:support@categoryarabia.com" className="text-blue-600">support@categoryarabia.com</a>.
          </p>

          <h2 className="font-semibold text-lg mt-6">Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Once your data is no longer needed, we will securely delete or anonymize it.
          </p>

          <h2 className="font-semibold text-lg mt-6">Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience. A cookie is a small file stored on your device that helps us remember your preferences, analyze Site usage, and improve functionality. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of the Site.
          </p>

          <h2 className="font-semibold text-lg mt-6">Children’s Privacy</h2>
          <p>
            Our Site is not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information.
          </p>

          <h2 className="font-semibold text-lg mt-6">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the “Effective Date” at the top will be updated. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>
        </ScrollArea>
        <FooterBannar />
      </div>
    </div>
  )
}
