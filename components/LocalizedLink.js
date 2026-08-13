import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { localizedPath } from "../lib/i18n-routing";

export default function LocalizedLink({ href, ...props }) {
  const { i18n } = useTranslation();
  const localizedHref = typeof href === "string" ? localizedPath(href, i18n.resolvedLanguage) : href;

  return <Link href={localizedHref} {...props} />;
}
