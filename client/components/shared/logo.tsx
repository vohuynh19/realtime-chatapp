import Image from "next/image";
interface ILogo {
  width: string;
  height: string;
  direction: string;
}
export default function Logo(data: ILogo) {
  return (
    <>
      {data.direction === "row" ? (
        <div className="flex flex-row justify-center items-center font-bold">
          <Image
            alt="logo"
            src="/assets/logo.jpg"
            height={data.height}
            width={data.width}
          />
          <div>ChatnChill</div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold">
          <Image
            alt="logo"
            src="/assets/logo.jpg"
            height={data.height}
            width={data.width}
          />
          <div>ChatnChill</div>
        </div>
      )}
    </>
  );
}
