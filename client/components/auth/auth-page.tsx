import { useState } from "react";
import { AuthSlide } from "../../lib/helpers/enums/auth-slide";
import LoginSlide from "./components/login-slide";
import RegisterSlide from "./components/register-slide";
import SlideRouter from "./components/slide-router";
import WelcomeSlide from "./components/welcome-slide";

export default function AuthPage() {
  const [slide, setSlide] = useState<AuthSlide>(AuthSlide.WELCOME);

  let slideContent: JSX.Element;
  const slideRouter = <SlideRouter setSlide={setSlide} currentSlide={slide} />;
  switch (slide) {
    case AuthSlide.WELCOME: {
      slideContent = <WelcomeSlide />;
      break;
    }
    case AuthSlide.LOGIN: {
      slideContent = <LoginSlide />;
      break;
    }
    case AuthSlide.REGISTER: {
      slideContent = <RegisterSlide />;
    }
  }
  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-b from-[#98A0FB] to-[#2C71CA]">
        <div className="relative flex h-full justify-center">
          {slideContent}
        </div>
        <div className="absolute w-full bottom-10">{slideRouter}</div>
      </div>
    </>
  );
}
