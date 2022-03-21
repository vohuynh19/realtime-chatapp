interface ITextField {
  type: string;
  isWarning?: boolean;
  warningContent?: string;
  placeholder: string;
  onChange: any;
  showLabel: boolean;
}

export default function TextField(data: ITextField) {
  return (
    <>
      {data.showLabel ? (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={data.type.toLowerCase()}
        >
          {data.type}
        </label>
      ) : undefined}

      {data.isWarning ? (
        <>
          <input
            className="shadow appearance-none border border-red-500 rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={data.type.toLowerCase()}
            type={data.type.toLowerCase()}
            placeholder={data.placeholder}
            onChange={(event: any) => data.onChange(event.target.value)}
          />
          <p className="text-red-500 text-xs italic">{data.warningContent}</p>
        </>
      ) : (
        <input
          className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={data.type.toLowerCase()}
          type={data.type.toLowerCase()}
          placeholder={data.placeholder}
          onChange={(event: any) => data.onChange(event.target.value)}
        />
      )}
    </>
  );
}
