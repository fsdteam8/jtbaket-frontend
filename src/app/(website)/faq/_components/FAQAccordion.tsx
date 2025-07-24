'use client'

import FooterBannar from "@/components/footerBannar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <section className="bg-[#F8FEFF] py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3">How do I register?</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
              Click the Register button at the top of the page. Fill out your information and verify your email to get started.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3">Is there a fee to join?</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
              No, joining is completely free!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3">What payment methods are accepted?</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
              We accept Visa, MasterCard, PayPal, and mobile money.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-white border border-gray-200 rounded-md shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3">Who can I contact for help?</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
              Please reach out to our support team via the contact form or email support@example.com.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <FooterBannar/>
      </div>
    </section>
  )
}
