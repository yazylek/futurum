import { useState } from "react";

type SimpleTypeaheadProps = {
  suggestions: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
};

const SimpleTypeahead = ({
  suggestions,
  selected,
  onChange,
}: SimpleTypeaheadProps) => {
  const [input, setInput] = useState("");

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) && !selected.includes(s)
  );

  const handleAdd = (tag: string) => {
    if (!selected.includes(tag)) {
      onChange([...selected, tag]);
      setInput("");
    }
  };

  const handleRemove = (tag: string) => {
    onChange(selected.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleAdd(input.trim());
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selected.map((tag) => (
          <span
            key={tag}
            onClick={() => handleRemove(tag)}
            className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
          >
            {tag} ✕
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border px-2 py-1 w-full"
        placeholder="Type keyword and press Enter"
      />
      {filteredSuggestions.length > 0 && (
        <ul className="border rounded shadow mt-1 bg-white max-h-20 overflow-auto">
          {filteredSuggestions.map((s) => (
            <li
              key={s}
              onClick={() => handleAdd(s)}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleTypeahead;
