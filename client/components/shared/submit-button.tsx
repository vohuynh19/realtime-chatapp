interface ISubmitButton {
  onClick: any;
  child: any;
}

export default function SubmitButton(data: ISubmitButton) {
  return (
    <>
      <div
        onClick={() => data.onClick()}
        className="bg-[#B9A0E1] 
        hover:opacity-80 
        text-white text-center font-bold py-2 px-4 rounded"
      >
        {data.child}
      </div>
    </>
  );
}
