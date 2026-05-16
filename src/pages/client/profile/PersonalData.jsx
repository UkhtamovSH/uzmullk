import useAuthStore from "@/store/useAuthStore";
import PersonalDataComp from "@/components/client/profile/PersonalData";

export default function PersonalDataPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <PersonalDataComp
      userData={{
        name:      user?.name      ?? "Закиров Шухрат Касымджанович",
        phone:     user?.phone     ?? "+998 90 123 45 67",
        pinfl:     user?.pinfl     ?? "34567890987",
        passport:  user?.passport  ?? "AD 1830473",
        birthDate: user?.birthDate ?? "14.02.1990",
        address:   user?.address   ?? "Ташкент, Юнусабадский район, 15",
      }}
    />
  );
}
