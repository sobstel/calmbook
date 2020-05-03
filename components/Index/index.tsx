import Logo from "../Logo";
import SearchInput from "./SearchInput";
import FadeIn from "../FadeIn";

type Props = {};

export default function Index({}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <FadeIn>
        <SearchInput />

        <div className="mt-12">
          <Logo />
        </div>
      </FadeIn>
    </div>
  );
}
