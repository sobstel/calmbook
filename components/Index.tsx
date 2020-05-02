import Logo from "./Logo";

type Props = {};

export default function Index({}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Logo />
    </div>
  );
}
