interface BaseProps {
  legend: string;
  placeholder?: string;
}

interface InputProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: false;
}

interface TextareaProps extends BaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

type LabelInputProps = InputProps | TextareaProps;

export const LabelInput: React.FC<LabelInputProps> = ({
  legend,
  placeholder = "",
  multiline = false,
  ...props
}) => {
  return (
    <fieldset
      className={`rounded-lg p-px bg-linear-to-r from-green-500 to-[#24a9e7]
      transition-all duration-300 hover:shadow-[0_0_25px_rgba(36,169,231,0.5)]
      focus-within:shadow-[0_0_30px_rgba(36,169,231,0.7)]`}
    >
      <div className="rounded-lg bg-gray-100/95 p-4 flex flex-col gap-1">

        <legend className="text-sm font-semibold text-gray-700 tracking-wide mb-1">
          {legend}
        </legend>

        {multiline ? (
          <textarea
            placeholder={placeholder}
            className={`w-full min-h-32 resize-none py-1 px-3 text-gray-800 placeholder-gray-400 
              focus:outline-none focus:border-transparent focus:ring-0 rounded-md`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            placeholder={placeholder}
            className={`w-full py-1 px-3 text-gray-800 placeholder-gray-400 
              focus:outline-none focus:border-transparent focus:ring-0 rounded-md`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </fieldset>
  );
};
