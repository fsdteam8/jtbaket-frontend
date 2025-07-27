/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MissionSection() {
  return (
    <section className="py-16 px-4 bg-[#F8FEFF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Trusted Destination for Quality Products at Honest Prices
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto mb-8">
            we believe shopping should be simple, secure, and satisfying. That's why we handpick every product with
            quality, value, and your satisfaction in mind. From the latest trends to everyday esse
          </p>
          <p className="text-primary font-semibold text-lg">Over 50,000+  <span className="text-black">customers across</span></p> 
        </div>

        <div >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Our Mission</h3>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
            <p>
              we believe shopping should be simple, secure, and satisfying. That's why we handpick every product with
              quality, value, and your satisfaction in mind. From the latest trends to everyday sees we believe shopping
              should be simple, secure, and satisfying. That's why we handpick every product with quality, value, and
              your satisfaction in mind. From the latest trends to everyday we believe shopping should be simple,
            </p>
            <p>
              secure, and satisfying. That's why we handpick every product with quality, value, and your satisfaction in
              mind. From the latest trends to everyday sees we believe shopping should be simple, secure, and
              satisfying. That's why we handpick every product with quality, value, and your satisfaction in mind. From
              the latest trends to everyday esse
            </p>
          </div>
          <div className="text-center mt-8">
           <Link href={"/about-us"}>  <Button className="bg-primary rounded-full hover:bg-primary/90 text-white px-8 py-5">See More...</Button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
