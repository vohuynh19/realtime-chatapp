import { ReactElement } from "react";
import DefaultLayout from "../layouts/default-layout";

export default function Home() {
  return <div>Hello world</div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
