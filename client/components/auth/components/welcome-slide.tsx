import Image from "next/image";
import Slide from "../../shared/slide";
export default function WelcomeSlide() {
  return (
    <>
      <Slide>
        <div className="flex-row">
          <div className="flex w-96 h-96 justify-center items-center bg-white rounded-full">
            <Image
              src="/assets/logo2.jpg"
              alt="Picture of logo"
              width={"300px"}
              height={"300px"}
            />
          </div>
          <div className="w-full text-center text-white text-3xl pt-2">
            ChatnChill
          </div>
          <div className="w-full text-center text-white text-xl pt-10">
            {"Let's talk together"}
          </div>
        </div>
      </Slide>
    </>
  );
}
