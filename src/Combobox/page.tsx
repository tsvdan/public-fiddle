import { useState } from "react";
import Combobox from ".";

type ComboOptions = "red" | "green" | "blue";

const ComboboxPage: React.FC<{}> = () => {
  const [selected, setSelected] = useState<ComboOptions>("red");
  return (
    <>
      <span>
        <span>{selected}</span> selected
      </span>
      <div className="bg-white mx-auto shadow-xl border-indigo-200 border-2 focus-within:border-indigo-400">
        <Combobox
          options={["red", "green", "blue"]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </>
  );
};
export default ComboboxPage;
