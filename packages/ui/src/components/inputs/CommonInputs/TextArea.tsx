const updateHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isAutoHeight?: boolean;
}
export function TextArea({ isAutoHeight = true, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      onInput={(e) => {
        if (isAutoHeight) updateHeight(e.target as HTMLTextAreaElement);
        props.onInput?.(e);
      }}
      onFocus={(e) => {
        if (isAutoHeight) updateHeight(e.target as HTMLTextAreaElement);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        if (isAutoHeight) updateHeight(e.target as HTMLTextAreaElement);
        props.onBlur?.(e);
      }}
    />
  );
}
