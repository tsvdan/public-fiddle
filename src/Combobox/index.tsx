import { useRef, useState } from "react";

type Props<Option> = {
  options: Option[];
  selected: Option;
  setSelected: React.Dispatch<React.SetStateAction<Option>>;
};

function Combobox<Option extends string>({
  options,
  selected,
  setSelected,
}: Props<Option>) {
  const [open, setOpen] = useState(false);
  const [listPos, setListPos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex flex-col"
      onBlur={() => {
        setOpen(false);
        setListPos(options.findIndex((opt) => opt === selected));
      }}
    >
      <input
        ref={inputRef}
        className="outline-none p-4"
        placeholder="Choose a color"
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowUp": {
              setOpen(true);
              setListPos((prev) => Math.max(0, prev - 1));
              return;
            }
            case "ArrowDown": {
              setOpen(true);
              setListPos((prev) => Math.min(prev + 1, options.length - 1));
              return;
            }
            case "Enter": {
              if (open) {
                setSelected(options[listPos]);
                setOpen(false);
              } else {
                setOpen(true);
              }
              return;
            }
            case "Escape": {
              inputRef.current?.blur();
            }
          }
        }}
      />
      {open && (
        <ul>
          {options.map((opt, i) => (
            <li
              onClick={() => {
                setListPos(i);
                setSelected(options[i]);
                setOpen(false);
              }}
              key={opt}
              className={`${
                listPos === i ? "bg-lime-200" : "hover:bg-lime-100"
              } `}
            >
              <span className="pl-4">{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Combobox;
