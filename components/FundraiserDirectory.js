import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import OrgCard from "./OrgCard";
import OrganizationModal from "./OrganizationModal";

const CATEGORY = {
  COMMUNITY: "community",
  LARGE: "large",
};

function CategoryTabs({ activeCategory, onChange }) {
  const { t } = useTranslation("common");
  const categories = [
    { id: CATEGORY.COMMUNITY, label: t("home.small-fundraisers") },
    { id: CATEGORY.LARGE, label: t("home.large-charities") },
  ];

  return (
    <div className="absolute inset-x-0 -top-7 flex justify-center px-4">
      <div
        className="flex w-full max-w-4xl rounded-full border-2 border-white bg-gray-200 shadow-sm"
        role="tablist"
      >
        {categories.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeCategory === id}
            onClick={() => onChange(id)}
            className={`flex-1 rounded-full px-3 py-3 text-sm font-bold transition-colors sm:px-5 ${
              activeCategory === id
                ? "bg-white text-blue-600"
                : "bg-gray-200 text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DepartmentFilter({ departments, value, onChange }) {
  const { t } = useTranslation("common");

  if (departments.length === 0) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-xs">
      <label htmlFor="department-filter" className="sr-only">
        {t("home.filter-region")}
      </label>
      <select
        id="department-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm focus:border-brandblue-default focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="all">{t("home.all-departments")}</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FundraiserDirectory({ organizations }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [activeCategory, setActiveCategory] = useState(CATEGORY.COMMUNITY);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const departments = useMemo(
    () => [...new Set(organizations.map(({ department }) => department).filter(Boolean))].sort(),
    [organizations],
  );

  const visibleOrganizations = organizations.filter((organization) => {
    const matchesCategory =
      organization.smallFundraiser === (activeCategory === CATEGORY.COMMUNITY);
    const matchesDepartment =
      selectedDepartment === "all" || organization.department === selectedDepartment;

    return matchesCategory && matchesDepartment;
  });

  function openOrganization(organization) {
    setSelectedOrganization(organization);
    window.history.pushState(null, "", `/${organization.slug}`);
  }

  function closeOrganization() {
    setSelectedOrganization(null);
    window.history.pushState(null, "", "/");
  }

  function navigateToOrganization() {
    if (selectedOrganization) router.push(`/${selectedOrganization.slug}`);
  }

  const categoryDescription =
    activeCategory === CATEGORY.COMMUNITY
      ? t("home.small-description")
      : t("home.large-description");

  return (
    <section className="full-bleed relative mt-20 box-border bg-gray-100 px-6 pb-16 pt-16 sm:px-12 lg:px-20">
      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      <p className="mx-auto max-w-xl px-0 py-3 text-center text-sm font-light sm:px-5">
        {categoryDescription}
      </p>

      <DepartmentFilter
        departments={departments}
        value={selectedDepartment}
        onChange={setSelectedDepartment}
      />

      {visibleOrganizations.length === 0 ? (
        <p className="mt-8 text-center">{t("home.empty")}</p>
      ) : (
        <div className="mx-auto mt-6 grid w-full max-w-[1800px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          {visibleOrganizations.map((organization) => (
            <OrgCard
              key={organization.slug}
              organization={organization}
              onOpen={() => openOrganization(organization)}
            />
          ))}
        </div>
      )}

      <OrganizationModal
        organization={selectedOrganization}
        onClose={closeOrganization}
        onNavigate={navigateToOrganization}
      />
    </section>
  );
}
