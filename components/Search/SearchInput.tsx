// import { useRef } from "react";
import SearchIcon from "./SearchIcon";
import Spinner from "../Spinner";

type Props = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function SearchInput({
  value,
  loading,
  onChange,
  onSubmit,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="relative text-lg bg-transparent text-gray-800">
      <div className="flex items-center border-b border-gray-800 py-2">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="bg-transparent border-none mr-3 px-2 pr-5 leading-tight focus:outline-none font-medium"
            type="text"
            value={value}
            onChange={handleChange}
            disabled={loading}
          />

          {loading ? (
            <div className="absolute right-0 top-0 mt-5 mr-4">
              <Spinner />
            </div>
          ) : (
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
              <SearchIcon />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
