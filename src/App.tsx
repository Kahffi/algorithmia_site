import Navbar from "@/components/ui/Navbar";
import test_image from "@/assets/images/test_image.jpg";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
function App() {
  return (
    <div className="bg-slate-400 min-h-screen">
      <Navbar />
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-52 pl-0">
              <div className="h-full">
                <img src={test_image} alt="" className="aspect-video" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <p className="absolute z-10 bottom-0 left-1/2 ">PEK</p>
      </Carousel>
    </div>
  );
}

export default App;
