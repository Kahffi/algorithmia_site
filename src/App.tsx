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

const imageCount = 8;

function App() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [carouselLength, setCarouselLength] = useState(0);
  const { state, dispatch } = useContext(UserContext)!;

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
        {/* Carousel Route (Home Page) */}

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
      </main>
      <Footer />
    </div>
  );
}

export default App;
