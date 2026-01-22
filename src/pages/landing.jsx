import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src="/image.png"
              className="h-14 sm:h-24 lg:h-32"
              alt="Hirrd Logo"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      {/* Call to Action Buttons */}
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="lg" className="px-10 py-6 text-lg">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* Companies Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner Image */}
      
<section className="w-full mt-16 px-4">
  <img
    src="/banner.jpeg"
    alt="Banner"
    className="w-full rounded-2xl shadow-lg object-cover max-h-[400px] sm:max-h-[500px] lg:max-h-[600px]"
  />
</section>


      
      {/* Cards Section */}
<section className="relative grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-12 max-w-5xl mx-auto px-4">
  <Card className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <CardHeader className="px-6 py-4">
      <CardTitle className="font-bold text-xl sm:text-2xl text-white">
        For Job Seekers
      </CardTitle>
    </CardHeader>
    <CardContent className="px-6 pb-6 text-gray-300 text-sm sm:text-base">
      Search and apply for jobs, track applications, and more.
    </CardContent>
  </Card>

  <Card className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <CardHeader className="px-6 py-4">
      <CardTitle className="font-bold text-xl sm:text-2xl text-white">
        For Employers
      </CardTitle>
    </CardHeader>
    <CardContent className="px-6 pb-6 text-gray-300 text-sm sm:text-base">
      Post jobs, manage applications, and find the best candidates.
    </CardContent>
  </Card>
</section>
{/* FAQ Section */}
<section className="max-w-4xl mx-auto mt-16 px-4">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8">
    Frequently Asked Questions
  </h2>

  <Accordion type="multiple" className="w-full">
    {faqs.map((faq, index) => (
      <AccordionItem
        key={index}
        value={`item-${index + 1}`}
        className="mb-4 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <AccordionTrigger className="flex justify-between items-center px-6 py-4 text-lg sm:text-xl font-semibold text-white hover:text-emerald-400 transition-colors duration-200 [&[data-state=open]>svg]:rotate-180">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-0 text-gray-300 text-sm sm:text-base">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</section>
   </main>
  );
};

export default LandingPage;
