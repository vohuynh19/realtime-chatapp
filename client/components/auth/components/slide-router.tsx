import { AuthSlide } from "../../../lib/helpers/enums/auth-slide";
import RouterButton from "../../shared/buttons/router-button";

interface ISlideRouter {
  setSlide: any;
  currentSlide: AuthSlide;
}

export default function SlideRouter(data: ISlideRouter) {
  switch (data.currentSlide) {
    case AuthSlide.WELCOME: {
      return (
        <>
          <div className="flex h-full w-full justify-center">
            <div className="w-80 px-6 justify-center items-center">
              <RouterButton
                onClick={() => data.setSlide(AuthSlide.LOGIN)}
                child={"Login"}
              />
            </div>
            <div className="w-80 px-6 justify-center items-center">
              <RouterButton
                onClick={() => data.setSlide(AuthSlide.REGISTER)}
                child={"Register"}
              />
            </div>
          </div>
        </>
      );
    }
    case AuthSlide.LOGIN: {
      return (
        <>
          <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="text-white">{"You do not have any account?"}</div>
            <div className="w-96 px-6 justify-center items-center">
              <RouterButton
                onClick={() => data.setSlide(AuthSlide.REGISTER)}
                child={"Register now!"}
              />
            </div>
          </div>
        </>
      );
    }
    case AuthSlide.REGISTER: {
      return (
        <>
          <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="text-white">{"You already had an account?"}</div>
            <div className="w-96 px-6 justify-center items-center">
              <RouterButton
                onClick={() => data.setSlide(AuthSlide.LOGIN)}
                child={"Login now!"}
              />
            </div>
          </div>
        </>
      );
    }
  }
}
