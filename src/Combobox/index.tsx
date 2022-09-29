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

  // hmm?
  const [listPos, setListPos] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex flex-col"
      onBlur={() => {
        setOpen(false);
        setListPos(filteredOptions.findIndex((opt) => opt === selected));
      }}
    >
      <input
        ref={inputRef}
        className="outline-none p-4"
        placeholder="Choose a color"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          const query = e.target.value;
          setFilteredOptions(
            query.length > 0
              ? options.filter((opt) => opt.startsWith(query))
              : options
          );
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowUp": {
              setOpen(true);
              setListPos((prev) => Math.max(0, prev - 1));
              return;
            }
            case "ArrowDown": {
              setOpen(true);
              setListPos((prev) =>
                Math.min(prev + 1, filteredOptions.length - 1)
              );
              return;
            }
            case "Enter": {
              if (open) {
                console.log(listPos, filteredOptions[listPos], filteredOptions);
                setSelected(filteredOptions[listPos]);
                setOpen(false);
              } else {
                setOpen(true);
              }
              return;
            }
            case "Escape": {
              inputRef.current?.blur();
              return;
            }
            default: {
              setOpen(true);
            }
          }
        }}
      />
      {open && (
        <ul>
          {filteredOptions.map((opt, i) => (
            <li
              onClick={() => {
                setListPos(i);
                setSelected(filteredOptions[i]);
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
