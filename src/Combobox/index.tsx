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

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex flex-col"
      onBlur={() => {
        setListPos(filteredOptions.findIndex((opt) => opt === selected));
        setOpen(false);
      }}
    >
      <input
        ref={inputRef}
        className="outline-none p-4"
        placeholder="Choose a color"
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onChange={(e) => {
          const query = e.target.value;
          const newFilteredOpts =
            query !== ""
              ? options.filter((opt) => opt.startsWith(query))
              : options;
          setFilteredOptions(newFilteredOpts);

          // can't directly use filteredOptions.find, bcof update batching
          const selectedPosInFiltered = newFilteredOpts.findIndex(
            (opt) => opt === selected
          );
          if (selectedPosInFiltered !== -1) {
            setListPos(selectedPosInFiltered);
          } else {
            setListPos(0);
          }
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
              if (open && filteredOptions[listPos]) {
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
              return;
            }
          }
        }}
      />
      {open && (
        <ul>
          {filteredOptions.map((opt, i) => (
            <li
              onPointerDown={() => {
                setListPos(i);
                setSelected(opt);
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
