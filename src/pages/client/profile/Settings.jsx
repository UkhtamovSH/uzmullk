import SettingsComp from "@/components/client/profile/Settings";

export default function SettingsPage() {
  const handleSave = (settings) => {
    // TODO: connect to API / i18n / theme store
    console.log("save settings", settings);
  };

  return (
    <SettingsComp
      settings={{ notifications: true, language: "uz", darkMode: false }}
      onSave={handleSave}
    />
  );
}
