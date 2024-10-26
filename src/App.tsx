import Navbar from "@/components/ui/Navbar";
import Autoplay from "embla-carousel-autoplay";
import CarouselBullet from "./components/ui/CarouselBullet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useContext, useEffect, useState } from "react";
import Footer from "./components/ui/Footer";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const imageCount = 8;

function App() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [carouselLength, setCarouselLength] = useState(0);
  const { state, dispatch } = useContext(UserContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (state) navigate("/home");
  }, [state, navigate]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCarouselLength(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Carousel Section */}
        <div className="flex justify-center">
          <Carousel
            setApi={setApi}
            opts={{
              align: "end",
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
              }),
            ]}
            className="max-w-3xl relative md:rounded-md overflow-hidden"
          >
            <CarouselContent className="aspect-video">
              {Array.from({ length: imageCount }).map((_, index) => (
                <CarouselItem key={index} className="pl-0">
                  <img
                    src={`./Carousel/carousel_${index + 1}.jpeg`}
                    alt=""
                    className="w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="pb-3 absolute bottom-0 left-1/2 -translate-x-1/2">
              <CarouselBullet size={carouselLength} activeIdx={current} />
            </div>
          </Carousel>
        </div>

        {/* Boxes Section */}
        <div className="flex flex-col items-center gap-6 p-6 mt-8">
          {/* Box 1: Expedition */}
          <div className="w-full max-w-lg p-4 bg-white rounded-lg border-4 border-purple-500 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
            <img src="./Carousel/carousel_7.jpeg" alt="Expedition" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-bold">Expedition</h3>
              <p className="text-gray-700 mt-2">
                The expedition aims to introduce the Mechatronics and AI program to the broader public, especially high school students.
                It showcases the festival as a space for young tech catalysts to expand their innovations, inspiring high school students to engage and participate in future competitions.
              </p>
              <a href="https://www.instagram.com/p/DAsCCNMResP/" className="text-blue-500 font-semibold mt-4 inline-block">See More →</a>
            </div>
          </div>

          {/* Box 2: Competition */}
          <div className="w-full max-w-lg p-4 bg-white rounded-lg border-4 border-blue-300 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
            <img src="./Carousel/carousel_11.png" alt="Competition" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-bold">Competition</h3>
              <p className="text-gray-700 mt-2">
                Got some crazy AI ideas swirling in your head? Here's your shot to bring them to life!
                The Competition gathers high school students like you to share innovative AI ideas through design and paper challenges.
              </p>
              <a href="#" className="text-red-500 font-semibold mt-4 inline-block">Closed </a>
            </div>
          </div>

          {/* Box 3: Exhibition */}
          <div className="w-full max-w-lg p-4 bg-white rounded-lg border-4 border-pink-300 shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
            <img src="./Carousel/carousel_9.jpeg" alt="Exhibition" className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-2xl font-bold">Exhibition</h3>
              <p className="text-gray-700 mt-2">
                The Exhibition will showcase exciting tech products and projects created by MKB students. 
                You’ll get to explore the cutting-edge tech that's being developed right now.
              </p>
              <a href="https://www.instagram.com/algorithmia.fest/" className="text-blue-500 font-semibold mt-4 inline-block">Attend →</a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
