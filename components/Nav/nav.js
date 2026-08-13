import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import logo from "../../public/logo-help-colombia.png";

const NAVIGATION = [
  { label: "nav.home", href: "/" },
  { label: "nav.for-donors", href: "/for-donors" },
  { label: "nav.for-fundraisers", href: "/for-fundraisers" },
  { label: "nav.about-us", href: "/about-us" },
];

const LANGUAGES = ["es", "en"];

function LanguageSwitcher({ compact = false }) {
  const router = useRouter();

  function changeLanguage(locale) {
    router.push(router.asPath, undefined, { locale });
  }

  return (
    <div className="flex min-w-fit rounded-full border-2 border-white bg-gray-200">
      {LANGUAGES.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => changeLanguage(language)}
          aria-pressed={router.locale === language}
          className={`${compact ? "px-2 py-2" : "px-5 py-3"} rounded-full text-sm font-bold uppercase ${
            router.locale === language
              ? "bg-white text-blue-600"
              : "bg-gray-200 text-black"
          }`}
        >
          {language}
        </button>
      ))}
    </div>
  );
}

function NavigationLink({ item, mobile = false }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isActive = router.pathname === item.href;
  const color = isActive
    ? "text-gray-800 hover:text-gray-800"
    : "text-gray-400 hover:text-gray-800";

  return (
    <Link
      href={item.href}
      className={`${mobile ? "block" : "align-middle"} rounded-md px-3 py-2 text-base font-bold ${color} md:text-lg md:leading-loose`}
    >
      {t(item.label)}
    </Link>
  );
}

export default function NavBar() {
  const { t } = useTranslation("common");

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <LanguageSwitcher compact />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300">
                <span className="sr-only">{t("nav.open-menu")}</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:justify-between">
              <Link href="/" className="flex w-10 items-center md:w-12 lg:w-16">
                <Image src={logo} alt="Help Colombia Now" priority />
              </Link>

              <div className="hidden items-center gap-4 sm:flex">
                {NAVIGATION.map((item) => (
                  <NavigationLink key={item.href} item={item} />
                ))}
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="space-y-1 rounded-2xl bg-gray-100 px-3 pb-4 pt-2 sm:hidden">
            {NAVIGATION.map((item) => (
              <NavigationLink key={item.href} item={item} mobile />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
