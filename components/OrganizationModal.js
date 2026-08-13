import Modal from "react-modal";
import { useTranslation } from "next-i18next/pages";
import OrgPage from "./OrgPage";

Modal.setAppElement("#__next");

function CloseIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}

export default function OrganizationModal({ organization, onClose, onNavigate }) {
  const { t } = useTranslation("common");

  return (
    <Modal
      isOpen={Boolean(organization)}
      onAfterOpen={() => { document.body.style.overflow = "hidden"; }}
      onAfterClose={() => { document.body.style.overflow = "auto"; }}
      onRequestClose={onClose}
      contentLabel={t("organization.dialog")}
      className="ReactModal__Content mx-auto mb-0 mt-7 max-h-[100vh] max-w-[100vw] overflow-y-auto overflow-x-hidden rounded-t-3xl bg-white pb-12 md:mb-12 md:mt-12 md:max-h-[90vh] md:max-w-[90vw] md:rounded-3xl md:pb-0"
      style={{ overlay: { backgroundColor: "rgba(4, 25, 48, 0.75)" } }}
    >
      <div className="absolute right-0 top-2 flex flex-col gap-3 md:right-5 md:top-6 lg:right-8 xl:right-14">
        <button
          type="button"
          onClick={onClose}
          aria-label={t("organization.close")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white"
        >
          <CloseIcon />
        </button>
        <button
          type="button"
          onClick={onNavigate}
          aria-label={t("organization.open-page")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-white"
        >
          <ExpandIcon />
        </button>
      </div>
      {organization && <OrgPage organization={organization} />}
    </Modal>
  );
}
