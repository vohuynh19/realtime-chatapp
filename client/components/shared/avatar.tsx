import Image from "next/image";

interface IAvatar {
  src: string;
  width: string;
  height: string;
}

export default function Avatar(data: IAvatar) {
  return (
    <Image
      src={data.src}
      alt="Picture of the author"
      width={data.width}
      height={data.height}
      className="rounded-full"
    />
  );
}
