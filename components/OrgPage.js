import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge/badge";
import Button from "./Button/button";
import Markdown from "react-markdown";
import { useTranslation } from 'next-i18next/pages';

export default function OrgPage({ organization, showFrontPageLink = false }) {
  const { t } = useTranslation('common');
  const {
    name,
    description,
    imageUrl,
    city,
    department,
    address,
    addressUrl,
    donationUrl,
    contactUrl,
    contactLabel,
    largeDonationsContact,
    cause,
    spendingTowards,
    accomplishmentsUrl,
    backedBy,
    paymentMethods,
    acceptsCrypto,
    social,
    websiteUrl,
  } = organization;

  return (
    <div>
      <div className="h-60 w-full lg:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Organization Logo"
          className=" w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
      {showFrontPageLink && (
        <div className="mt-12 md:px-20 lg:px-40">
          <Link href="/" className="h-12 font-bold">&lt; {t('organization.back').toUpperCase()}</Link>
        </div>
      )}
      <div
        id="organization"
        className={showFrontPageLink ? "px-0 pt-8 md:px-20 lg:px-40" : "p-8 md:py-12 md:px-24 lg:px-44"}
      >
        <h1 className="text-4xl font-black">{name}</h1>
        {(city || department) && (
          <p className="mt-3 text-base font-semibold text-brandblue-default">
            {t('organization.location')}: {[city, department].filter(Boolean).join(", ")}
          </p>
        )}
        {address && (
          <p className="mt-2 text-sm text-gray-700">
            {address}
            {addressUrl && (
              <>
                {" · "}
                <a
                  href={addressUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brandblue-default underline underline-offset-4 hover:text-brandblue-accent"
                >
                  {t('organization.view-map')}
                </a>
              </>
            )}
          </p>
        )}
        <div
          id="links-area"
          className="mt-10 flex w-full flex-wrap items-center gap-8"
        >
          {donationUrl && (
            <div className="flex w-full flex-row flex-wrap content-center md:w-64">
              <Button
                value={t('organization.donate')}
                href={donationUrl.trim()}
                target="_blank"
                isExternalLink
              />
            </div>
          )}
          {contactUrl && (
            <div className="flex w-full flex-row flex-wrap content-center md:w-64">
              <Button
                value={contactLabel || t('organization.contact-action')}
                href={contactUrl}
                target="_blank"
                isExternalLink
              />
            </div>
          )}
          <div id="links" className="flex flex-wrap items-center gap-5 md:gap-7">
            {websiteUrl && (
              <a
                href={websiteUrl.trim()}
                target="_blank"
                rel="noreferrer"
                className=" text-brandblue-default text-lg md:text-xl font-bold underline underline-offset-4 hover:text-brandblue-accent"
              >
                {t('organization.website')}
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="flex items-center">
                <Image
                  src="/assets/icons/instagram.svg"
                  alt="instagram"
                  height={28}
                  width={28}
                  loading="lazy"
                ></Image>
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" className="flex items-center">
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="Facebook"
                  height={28}
                  width={28}
                  loading="lazy"
                ></Image>
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" className="flex items-center">
                <Image
                  src="/assets/icons/twitter.svg"
                  alt="twitter"
                  height={28}
                  width={28}
                  loading="lazy"
                ></Image>
              </a>
            )}
          </div>
        </div>
        <section className="max-w-5xl mt-12">
          <h2 className="font-black text-xl">{t('organization.introduction')}</h2>
          <div className="mt-6 mb-3">
            <Markdown>{description}</Markdown>
          </div>
          <Badge value={cause}/>
          {spendingTowards && (
            <>
              <h2 className="font-black text-xl mt-12">
                {t('organization.spending')}
              </h2>
              <p className="mt-6">{spendingTowards}</p>
            </>
          )}
          {accomplishmentsUrl && (
            <>
              <h2 className="font-black text-xl mt-12">
                {t('organization.accomplishments')}
              </h2>
              <p className="mt-6">
                <a
                  href={accomplishmentsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className=" text-brandblue-default underline underline-offset-4 text-base font-bold hover:text-brandblue-accent"
                >
                  {t('organization.past-work')}
                </a>
              </p>
            </>
          )}
          {backedBy && (
            <>
              <h2 className="font-black text-xl mt-12">
                {t('organization.supporters')}
              </h2>
              <p className="mt-6">{backedBy}</p>
            </>
          )}
          {largeDonationsContact && (
            <>
              <h2 className="font-black text-xl mt-12">{t('organization.contact')}</h2>
              <p className="mt-6">{largeDonationsContact}</p>
            </>
          )}
          {(paymentMethods.length > 0 || acceptsCrypto) && (
            <>
              <h2 className="mb-4 mt-12 text-2xl font-black">{t('organization.payment-method')}</h2>
              <div className="mb-16 mt-2 flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <Badge key={method} value={method} />
                ))}
                {acceptsCrypto && (
                  <div className="mt-4 rounded-full border-2 border-brandblue-default px-4 py-1 text-center text-sm text-brandblue-default">
                    {t('organization.crypto')}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
