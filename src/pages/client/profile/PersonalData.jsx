import useAuthStore from "@/store/useAuthStore";
import PersonalDataComp from "@/components/client/profile/PersonalData";

export default function PersonalDataPage() {
  const user = useAuthStore((s) => s.user);

  const handleUpdate = (updatedData) => {
    // TODO: connect to API
    console.log("update personal data", updatedData);
  };

  return (
    <PersonalDataComp
      userData={{
        name:      user?.name ?? "",
        phone:     user?.phone ?? "",
        email:     user?.email ?? "",
        pinfl:     user?.pinfl ?? "",
        passport:  user?.passport ?? "",
        birthDate: user?.birthDate ?? "",
        address:   user?.address ?? "",
      }}
      onUpdate={handleUpdate}
    />
  );
}
