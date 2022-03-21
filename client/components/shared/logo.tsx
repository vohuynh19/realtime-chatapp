import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="flex flex-row justify-center items-center font-bold">
        <Image
          alt="logo"
          src="/assets/logo2.jpg"
          height={"64px"}
          width={"64px"}
        />
        <div>ChatnChill</div>
      </div>
    </>
  );
}
