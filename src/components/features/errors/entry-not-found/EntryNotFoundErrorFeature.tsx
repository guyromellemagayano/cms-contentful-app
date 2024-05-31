import { useTranslations } from "next-intl";

import { ErrorBoxShared } from "@/components/shared/error-box";
import type { WithAny, WithClassName } from "@/types/common";

export type EntryNotFoundErrorFeatureProps = WithAny & WithClassName;

/**
 * Renders the entry not found error feature component.
 * @param {EntryNotFoundErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const EntryNotFoundErrorFeature = (props: EntryNotFoundErrorFeatureProps) => {
  const { className, ...rest } = props;

  const t = useTranslations();

  return (
    <ErrorBoxShared className={className} {...rest}>
      {t("error.componentNotFound")}
    </ErrorBoxShared>
  );
};

EntryNotFoundErrorFeature.displayName = "EntryNotFoundErrorFeature";

export default EntryNotFoundErrorFeature;
