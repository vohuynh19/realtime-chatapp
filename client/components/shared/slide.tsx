export default function Slide({ children }: any) {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        {children}
      </div>
    </>
  );
}
