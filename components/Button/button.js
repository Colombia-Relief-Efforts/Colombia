import Image from "next/image";
import { withBasePath } from "../../lib/i18n-routing";
import LocalizedLink from "../LocalizedLink";

const className = "flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#005BBC] py-3 text-lg font-bold leading-6 text-white hover:bg-[#1E429F] focus:outline-none focus:ring-4 focus:ring-blue-300";

function ButtonContent({ value, icon, isExternalLink }) {
  return (
    <>
      {icon && <Image src={icon} alt="" width={16} height={16} className="mr-3" />}
      {value}
      {isExternalLink && (
        <Image
          src={withBasePath("/assets/external_link.svg")}
          alt=""
          width={18}
          height={18}
          className="ml-3"
        />
      )}
    </>
  );
}

export default function Button({ onClick, value, href, target, isExternalLink = false, icon }) {
  const content = <ButtonContent value={value} icon={icon} isExternalLink={isExternalLink} />;

  if (href) {
    const linkProps = {
      href,
      target,
      rel: target === "_blank" ? "noreferrer" : undefined,
      className,
      children: content,
    };

    return href.startsWith("/") ? (
      <LocalizedLink {...linkProps} />
    ) : (
      <a
        {...linkProps}
      />
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
