import { useEffect, useRef, useState } from "react";

type Props<Option> = {
  options: Option[];
  selected: Option;
  setSelected: React.Dispatch<React.SetStateAction<Option>>;
  maxHeight?: string;
  width?: string;
  placeholder?: string;
};

function Combobox<Option extends string>({
  options,
  selected,
  setSelected,
  maxHeight = "400px",
  width = "300px",
  placeholder,
}: Props<Option>) {
  const [open, setOpen] = useState(false);
  // hmm?
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [listPos, setListPos] = useState(
    options.findIndex((opt) => opt === selected)
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    console.log("Running useeffect");
    if (open) {
      // scroll into view
      // we find our guy
      let selectedLi = null;
      for (
        let i = 0;
        i < (ulRef.current?.children as HTMLCollection).length || 0;
        i++
      ) {
        if (i === listPos) {
          selectedLi = ulRef.current?.children[i];
          break;
        }
      }
      selectedLi?.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
  }, [open, listPos, filteredOptions]);

  return (
    <div className="bg-white mx-auto shadow-xl border-indigo-200 border-2 focus-within:border-indigo-400">
      <div
        className={`flex flex-col`}
        style={{ maxHeight, width }}
        onBlur={() => {
          setListPos(filteredOptions.findIndex((opt) => opt === selected));
          setOpen(false);
        }}
      >
        <input
          ref={inputRef}
          className={`outline-none p-4 ${
            open && "border-b-2"
          } border-indigo-400`}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            const query = e.target.value;
            const newFilteredOpts =
              query !== ""
                ? options.filter((opt) =>
                    opt.toLowerCase().startsWith(query.trim().toLowerCase())
                  )
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
                e.preventDefault();
                setOpen(true);
                setListPos((prev) => Math.max(0, prev - 1));
                return;
              }
              case "ArrowDown": {
                e.preventDefault();
                setOpen(true);
                setListPos((prev) =>
                  Math.min(prev + 1, filteredOptions.length - 1)
                );
                return;
              }
              case "Enter": {
                if (open && filteredOptions[listPos]) {
                  setSelected(filteredOptions[listPos]);
                  (inputRef.current as HTMLInputElement).value =
                    filteredOptions[listPos];
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
          <ul ref={ulRef} className="overflow-y-scroll">
            {filteredOptions.map((opt, i) => (
              <li
                onPointerDown={() => {
                  setListPos(i);
                  setSelected(opt);
                  setOpen(false);
                  (inputRef.current as HTMLInputElement).value =
                    filteredOptions[i];
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
    </div>
  );
}
export default Combobox;
