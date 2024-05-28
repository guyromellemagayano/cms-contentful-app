import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { ParamsData } from "@/app/types/page";

export type PathnamesPageProps = {
  params: ParamsData;
};

const PathnamesPage = ({ params: { locale } }: PathnamesPageProps) => {
  const localeCheck = locale && locale?.length > 0 ? locale : "en";

  unstable_setRequestLocale(localeCheck);

  const t = useTranslations("PathnamesPage");

  return (
    <p>
      {t.rich("description", {
        p: (chunks) => <p className="mt-4">{chunks}</p>,
        code: (chunks) => (
          <code className="font-mono text-white">{chunks}</code>
        ),
      })}
    </p>
  );
};

PathnamesPage.displayName = "PathnamesPage";

export default PathnamesPage;
