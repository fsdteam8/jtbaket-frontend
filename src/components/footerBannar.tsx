import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const FooterBannar = () => {
  return (
    <div>
      <div className=" rounded-lg  p-6 my-[100px]">
        <div className="text-center mb-[42px]">
          <h2 className="text-xl md:text-4xl text-[#1F2937]  font-bold mb-2">
            Contact us to purchase your
            <br />
            favorite products.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-[118px]">
          <div className="flex-shrink-0">
            <div className="w-[475px] h-[457px]  bg-gradient-to-br from-teal-100 to-teal-200 rounded-3xl flex items-center justify-center">
              <Image
                src="/footerBannar.png"
                alt="Contact illustration"
                width={900}
                height={900}
                className="rounded-lg w-full"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">+1 818-269-4690</span> 
       
            </div>
          
            {/* <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700"> JtbakedCA@gmail.com</span>
            </div> */}
            <a href="mailto:JtbakedCA@gmail.com" className="flex items-center gap-3 hover:underline">
  <Mail className="w-5 h-5 text-gray-600" />
  <span className="text-gray-700">JtbakedCA@gmail.com</span>
</a>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <div className="text-gray-700">
                <div>3540 E Pico Blvd
Los Angeles,</div>
                <div>CA  90023
United States</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBannar;
