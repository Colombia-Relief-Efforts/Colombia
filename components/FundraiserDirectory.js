import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { localizedPath } from "../lib/i18n-routing";
import OrgCard from "./OrgCard";
import OrganizationModal from "./OrganizationModal";

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
  const { t, i18n } = useTranslation("common");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const departments = useMemo(
    () => [...new Set(organizations.map(({ department }) => department).filter(Boolean))].sort(),
    [organizations],
  );

  const visibleOrganizations = organizations.filter(
    (organization) =>
      selectedDepartment === "all" || organization.department === selectedDepartment,
  );

  function openOrganization(organization) {
    setSelectedOrganization(organization);
  }

  function closeOrganization() {
    setSelectedOrganization(null);
  }

  function navigateToOrganization() {
    if (selectedOrganization) {
      router.push(localizedPath(`/${selectedOrganization.slug}`, i18n.resolvedLanguage));
    }
  }

  return (
    <section className="full-bleed box-border bg-gray-100 px-6 pb-16 pt-16 sm:px-12 lg:px-20">
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
