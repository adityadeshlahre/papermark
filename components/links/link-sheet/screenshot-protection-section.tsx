import { useEffect, useState } from "react";

import { DEFAULT_LINK_TYPE } from ".";
import LinkItem from "./link-item";
import { LinkUpgradeOptions } from "./link-options";

export default function ScreenshotProtectionSection({
  data,
  setData,
  hasFreePlan,
  handleUpgradeStateChange,
}: {
  data: DEFAULT_LINK_TYPE;
  setData: React.Dispatch<React.SetStateAction<DEFAULT_LINK_TYPE>>;
  hasFreePlan: boolean;
  handleUpgradeStateChange: ({
    state,
    trigger,
    plan,
  }: LinkUpgradeOptions) => void;
}) {
  const { enableScreenshotProtection } = data;
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    setEnabled(enableScreenshotProtection);
  }, [enableScreenshotProtection]);

  const handleEnableScreenshotProtection = () => {
    const updatedEnableScreenshotProtection = !enabled;
    setData({
      ...data,
      enableScreenshotProtection: updatedEnableScreenshotProtection,
    });
    setEnabled(updatedEnableScreenshotProtection);
  };

  return (
    <div className="pb-5">
      <LinkItem
        title="Enable screenshot protection"
        enabled={enabled}
        action={handleEnableScreenshotProtection}
        hasFreePlan={hasFreePlan}
        requiredPlan="business"
        upgradeAction={() =>
          handleUpgradeStateChange({
            state: true,
            trigger: "link_sheet_screenshot_protection_section",
            plan: "Business",
          })
        }
      />
    </div>
  );
}
