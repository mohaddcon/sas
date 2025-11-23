import About from '@/components/about';
import Contact from '@/components/contact';
import BestSellers from './_components/BestSellers';
import Hero from './_components/Hero';
// Update the import path to match the actual file location and filename
import TruckTypes from "@/components/truck-types";
import Features from "@/components/features";
import ServiceTypes from "@/components/service-types";
import HowItWorks from "@/components/how-it-works";
import OrderProcess from "@/components/order-process";
import Partners from "@/components/partners";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  

  return (
    <main
      className='min-h-screen relative bg-transparent'
       
    >
      
      <div className='relative z-10'>
  
        <About />
              <Contact />
      </div>
    </main>
  );
}
