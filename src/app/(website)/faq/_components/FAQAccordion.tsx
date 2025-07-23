'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-center text-xl font-semibold mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="item-1" className=" bg-[#FFFFFF]">
          <AccordionTrigger>How do I register?</AccordionTrigger>
          <AccordionContent>
            Click the Register button at the top of the page. Fill out your information and verify your email to get started.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is there a fee to join?</AccordionTrigger>
          <AccordionContent>
            No, joining is completely free!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
          <AccordionContent>
            We accept Visa, MasterCard, PayPal, and mobile money.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Who can I contact for help?</AccordionTrigger>
          <AccordionContent>
            Please reach out to our support team via the contact form or email support@example.com.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
