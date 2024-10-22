import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "@/components/ui/Navbar";
import test_image from "@/assets/images/test_image.jpg";
import Autoplay from "embla-carousel-autoplay";
import CarouselBullet from "./components/ui/CarouselBullet";
import SignIn from "@/pages/SignIn";  // Import SignIn page
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import SignUpForm from "./components/ui/SignUpForm";


const ImgArr = [1, 1, 1, 1, 1];

function App() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [carouselLength, setCarouselLength] = useState(0);

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
      <div className="bg-slate-400 min-h-screen">
        <Navbar />
       
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
                    {ImgArr.map((_, index) => (
                      <CarouselItem key={index} className="pl-0">
                        <img
                          src={test_image}
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
            }
          />
      </div>


      <SignUpForm />
    </div>
  );
}

export default App;
