import Brands from "@/components/atoms/Brands/Brands";
import Landing from "@/components/atoms/Landing/Landing";
import { Selected } from "@/components/atoms/Selected/Selected";

export default function Home() {
  return (
    <main className="">
      <Landing />
      <Brands />
      <Selected />
    </main>
  );
}
