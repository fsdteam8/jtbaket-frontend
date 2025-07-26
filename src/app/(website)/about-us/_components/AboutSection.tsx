import FooterBannar from "@/components/footerBannar";

export function AboutSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="container mx-auto space-y-12 text-gray-800">
        {/* Section 1: Who We Are */}
        <div className="space-y-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Who We Are
          </h2>
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
            <p>
              We believe shopping should be simple, secure, and satisfying. We
              believe shopping should be simple, secure, and satisfying. That&apoch;s
              why we handpick every product with quality, value, and your
              satisfaction in mind. From the latest trends to everyday
              essentials, we believe shopping should be simple, secure, and
              satisfying.
            </p>
            <p>
              We believe shopping should be simple, secure, and satisfying.
              That&apoch;s why we handpick every product with quality, value, and
              your satisfaction in mind. From the latest trends to everyday
              sees, we believe shopping should be simple, secure, and
              satisfying.
            </p>
            <p>
              We believe shopping should be simple, secure, and satisfying.
              That&apoch;s why we handpick every product with quality, value, and
              your satisfaction in mind. From the latest trends to everyday
              sees, we believe shopping should be simple.
            </p>
          </div>
        </div>

        {/* Section 2: Platform Description */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-2xl font-semibold text-gray-900">
            Prodify is a semi-closed product catalog platform for businesses.
          </h3>
          <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-600">
            <p>
              We believe shopping should be simple, secure, and satisfying.
              That&apoch;s why we handpick every product with quality, value, and
              your satisfaction in mind. From the latest trends to everyday
              sees we believe shopping should be simple, secure, and
              satisfying.
            </p>
            <p>
              We believe shopping should be simple, secure, and satisfying.
              That&apoch;s why we handpick every product with quality, value, and
              your satisfaction in mind. From the latest trends to everyday
              esse.
            </p>
          </div>
        </div>
        <FooterBannar />
      </div>
    </section>
  )
}
