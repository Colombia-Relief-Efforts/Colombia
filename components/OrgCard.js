import Button from "./Button/button";
import Image from "next/image";
import Markdown from "react-markdown";
import { useTranslation } from 'next-i18next/pages';

function OrgCard({ organization, onOpen }) {
  const { t } = useTranslation('common');
  const { name, description, imageUrl, city, department } = organization;

  return (
    <article className="flex w-full min-w-0 flex-col overflow-hidden rounded-3xl bg-[#F2F6FF] shadow-lg transition-shadow hover:shadow-xl">
      <button
        type="button"
        onClick={onOpen}
        className="w-full cursor-pointer bg-white/70 p-4"
        aria-label={`${t('organization.learn-more')}: ${name}`}
      >
        <div className="relative mx-auto h-80 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </button>
      <div className="flex min-w-0 flex-1 flex-col p-6 md:p-8">
        <button type="button" onClick={onOpen} className="w-full text-left">
          <h2 className="mb-3 text-2xl font-bold">{name}</h2>
          {(city || department) && (
            <p className="mb-3 text-sm font-semibold text-brandblue-default">
              {[city, department].filter(Boolean).join(", ")}
            </p>
          )}
          <div className="line-clamp-3 text-base leading-relaxed text-gray-700">
            <Markdown>{description}</Markdown>
          </div>
        </button>
        <div className="mt-auto flex pt-6">
          <Button onClick={onOpen} value={t('organization.learn-more')}/>
        </div>
      </div>
    </article>
  );
}
export default OrgCard;
