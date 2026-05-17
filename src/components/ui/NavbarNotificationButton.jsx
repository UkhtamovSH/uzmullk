import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import PassportPreview from "@/components/client/profile/PassportPreview";
import DeleteTrashIllustration from "@/assets/svg/DeleteTrashIllustration";
import HomeSideIcon from "@/assets/svg/HomeSideIcon";
import NotificationBellIcon from "@/assets/svg/NotificationBellIcon";

const FILTERS = [
  { key: "all", badge: null },
  { key: "payments", badge: 12 },
  { key: "services", badge: 3 },
  { key: "system", badge: null },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    titleKey: "notificationItemTitleUnread",
    messageKey: "notificationItemMessage",
    helperKey: "notificationItemHelper",
    dateLabel: "30 Апреля, 2022",
    dayKey: "notificationToday",
    type: "payments",
    read: false,
    previewTitleKey: "notificationPreviewTitle",
    previewDescriptionKey: "notificationPreviewDescription",
    heroType: "placeholder",
    detailCard: {
      propertyType: "Yakka tartibdagi turar joy",
      cadastre: "21:22:00:00:00:0000:000",
      address: "Usta Omon ko'chasi, 40-uy",
      statusKey: "notificationRequestStateInactive",
      fullName: "Мадамиминова Барно Бегзодовна",
      sentAt: "12.10.2025 13:45",
      cadastreLabel: "17:13:10:01:05:6963",
      addressText:
        "г. Ташкент, Яшназарский район, МФУ Келажак Турон, улица Юнкаий, дом 28, квартира 289",
    },
  },
  {
    id: 2,
    titleKey: "notificationItemTitleUnread",
    messageKey: "notificationItemMessage",
    helperKey: "notificationItemHelper",
    dateLabel: "30 Апреля, 2022",
    dayKey: "notificationToday",
    type: "services",
    read: false,
    previewTitleKey: "notificationPreviewTitle",
    previewDescriptionKey: "notificationPreviewDescription",
    heroType: "placeholder",
    detailCard: {
      propertyType: "Yakka tartibdagi turar joy",
      cadastre: "21:22:00:00:00:0000:000",
      address: "Usta Omon ko'chasi, 40-uy",
      statusKey: "notificationRequestStateInactive",
      fullName: "Мадамиминова Барно Бегзодовна",
      sentAt: "12.10.2025 13:45",
      cadastreLabel: "17:13:10:01:05:6963",
      addressText:
        "г. Ташкент, Яшназарский район, МФУ Келажак Турон, улица Юнкаий, дом 28, квартира 289",
    },
  },
  {
    id: 3,
    titleKey: "notificationItemTitleRead",
    messageKey: "notificationItemMessage",
    helperKey: "notificationItemHelper",
    dateLabel: "30 Апреля, 2022",
    dayKey: "notificationYesterday",
    dayDateLabel: "14.05.2026",
    type: "system",
    read: true,
  },
  {
    id: 4,
    titleKey: "notificationItemTitleRead",
    messageKey: "notificationItemMessage",
    helperKey: "notificationItemHelper",
    dateLabel: "30 Апреля, 2022",
    dayKey: "notificationYesterday",
    dayDateLabel: "14.05.2026",
    type: "payments",
    read: true,
  },
  {
    id: 5,
    titleKey: "notificationItemTitleRead",
    messageKey: "notificationItemMessage",
    helperKey: "notificationItemHelper",
    dateLabel: "30 Апреля, 2022",
    dayKey: "notificationYesterday",
    dayDateLabel: "14.05.2026",
    type: "all",
    read: true,
  },
];

const NavbarNotificationButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [detailStep, setDetailStep] = useState("preview");
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [expandedActionId, setExpandedActionId] = useState(null);
  const [showDeletedToast, setShowDeletedToast] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (!showDeletedToast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowDeletedToast(false);
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [showDeletedToast]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    return notifications.filter((item) => item.type === activeFilter);
  }, [activeFilter, notifications]);

  const groupedNotifications = useMemo(() => {
    const order = ["notificationToday", "notificationYesterday"];

    return order
      .map((dayKey) => {
        const items = filteredNotifications.filter((item) => item.dayKey === dayKey);
        if (items.length === 0) {
          return null;
        }

        return {
          dayKey,
          dateLabel: items[0].dayDateLabel,
          items,
        };
      })
      .filter(Boolean);
  }, [filteredNotifications]);

  const selectedNotification = useMemo(
    () => notifications.find((item) => item.id === selectedNotificationId) ?? null,
    [notifications, selectedNotificationId]
  );

  const handleNotificationClick = (id) => {
    setExpandedActionId(null);
    setSelectedNotificationId(id);
    setDetailStep("preview");
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkRead = (id) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    setExpandedActionId(null);
    setSelectedNotificationId(null);
  };

  const handleDeleteRequest = (id) => {
    setExpandedActionId(null);
    setDeleteCandidateId(id);
  };

  const handleDeleteConfirm = () => {
    if (!deleteCandidateId) {
      return;
    }

    setNotifications((current) =>
      current.filter((item) => item.id !== deleteCandidateId)
    );
    setExpandedActionId(null);
    setSelectedNotificationId(null);
    setDeleteCandidateId(null);
    setShowDeletedToast(true);
  };

  const handleDeleteCancel = () => {
    setDeleteCandidateId(null);
  };

  const handleBack = () => {
    if (detailStep === "request") {
      setDetailStep("preview");
      return;
    }

    setSelectedNotificationId(null);
  };

  const handleOpenDetails = () => {
    setDetailStep("request");
  };

  const handleActionToggle = (id) => {
    setExpandedActionId((current) => (current === id ? null : id));
  };

  const handleRequestAction = () => {
    if (selectedNotificationId) {
      handleMarkRead(selectedNotificationId);
    }
    setDetailStep("preview");
  };

  return (
    <div ref={ref} className="relative">
      {showDeletedToast && (
        <div className="fixed left-1/2 top-10 z-[80] -translate-x-1/2">
          <div className="flex min-w-[360px] items-center gap-3 rounded-[16px] bg-[#1DBA61] px-5 py-4 text-white shadow-[0_10px_24px_rgba(29,186,97,0.35)]">
            <CheckCircle2 size={20} className="shrink-0" />
            <span className="flex-1 text-[16px] font-semibold leading-none">
              {t("notificationDeleted")}
            </span>
            <button
              type="button"
              onClick={() => setShowDeletedToast(false)}
              className="text-white/95 transition-opacity hover:opacity-80"
              aria-label={t("close")}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`relative flex h-[42px] w-[48px] items-center justify-center rounded-xl border bg-white text-[#292D32] transition-colors ${
          open
            ? "border-transparent shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
        aria-label={t("notificationsTitle")}
      >
        <NotificationBellIcon size={22} />
        {unreadCount > 0 && (
          <span className="absolute right-[9px] top-[8px] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#FF3B30]" />
        )}
      </button>

      {open && !selectedNotification && (
        <div className="absolute right-[-86px] top-[calc(100%+14px)] z-50 w-[430px] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div className="px-6 pb-5 pt-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-bold leading-[1.1] text-[#101828]">
                  {t("notificationsTitle")}
                </h3>
                <p className="mt-1.5 text-[11px] font-semibold leading-4 text-[#667085]">
                  {t("notificationsSummary", { count: unreadCount })}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EEF2F6] text-[#101828] transition-colors hover:bg-[#E4EAF1]"
                  aria-label={t("notificationsMarkAll")}
                >
                  <CheckCheck size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EEF2F6] text-[#101828] transition-colors hover:bg-[#E4EAF1]"
                  aria-label={t("close")}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 h-px w-full bg-[#E4E7EC]" />

            <div className="mt-5 flex gap-2.5 overflow-x-auto pb-1">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.key;

                return (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex h-[44px] shrink-0 items-center gap-2 rounded-[14px] px-4 text-[12px] font-semibold transition-colors ${
                      isActive
                        ? "bg-[#2D36C8] text-white"
                        : "bg-[#EEF2F6] text-[#101828] hover:bg-[#E4EAF1]"
                    }`}
                  >
                    <span>{t(`notificationFilter.${filter.key}`)}</span>
                    {filter.badge ? (
                      <span
                        className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold leading-none ${
                          isActive ? "bg-[#FF3B30] text-white" : "bg-[#FF3B30] text-white"
                        }`}
                      >
                        {filter.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 max-h-[620px] overflow-y-auto pr-1">
              {groupedNotifications.map((group) => (
                <div key={group.dayKey} className="mb-6 last:mb-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-[14px] font-bold leading-5 text-[#101828]">
                      {t(group.dayKey)}
                    </h4>
                    {group.dateLabel ? (
                      <span className="text-[10px] font-semibold leading-4 text-[#667085]">
                        {group.dateLabel}
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2.5">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-[20px] border border-[#D9E0EA] bg-[#F7F9FC]"
                      >
                        <button
                          type="button"
                          onClick={() => handleNotificationClick(item.id)}
                          className="w-full px-4 py-3 text-left transition-colors hover:bg-[#F0F4F8]"
                        >
                          <div className="flex items-center justify-between gap-3 border-b border-[#DCE3EC] pb-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                  item.read ? "bg-[#E9EEF5] text-[#667085]" : "bg-[#DFF7E8] text-[#22C55E]"
                                }`}
                              >
                                <Bell size={11} />
                              </div>
                              <span
                                className={`text-[12px] font-bold leading-4 ${
                                  item.read ? "text-[#667085]" : "text-[#101828]"
                                }`}
                              >
                                {t(item.titleKey)}
                              </span>
                            </div>
                            <span className="text-[10px] font-medium leading-4 text-[#475467]">
                              {item.dateLabel}
                            </span>
                          </div>

                          <p className="pt-2.5 text-[12px] font-bold leading-5 text-[#101828]">
                            {t(item.messageKey)}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-4 text-[#475467]">
                            {t(item.helperKey)}
                          </p>
                        </button>

                        <div className="flex justify-end px-4 pb-2">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleActionToggle(item.id);
                            }}
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                              expandedActionId === item.id
                                ? "bg-[#2D36C8] text-white"
                                : "bg-[#E8EEF7] text-[#101828] hover:bg-[#dde6f2]"
                            }`}
                            aria-label={t("notificationDetailsButton")}
                            aria-expanded={expandedActionId === item.id}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${
                                expandedActionId === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {expandedActionId === item.id && (
                          <div className="border-t border-[#DCE3EC] px-4 pb-3 pt-2.5">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleMarkRead(item.id)}
                                className="flex h-[44px] flex-1 items-center justify-center rounded-[14px] bg-[#E8EEF7] px-3 text-[14px] font-semibold text-[#101828] transition-colors hover:bg-[#dde6f2]"
                              >
                                {t("notificationMarkRead")}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRequest(item.id)}
                                className="flex h-[44px] flex-1 items-center justify-center rounded-[14px] bg-[#FF3B30] px-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                              >
                                {t("delete")}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {open && selectedNotification && (
        <div className="absolute right-[-86px] top-[calc(100%+14px)] z-50 w-[430px] overflow-hidden rounded-[30px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div className="max-h-[700px] overflow-y-auto px-6 pb-6 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#F1F5F9] text-[#101828] transition-colors hover:bg-[#E8EEF5]"
              aria-label={t("propBack")}
            >
              <ArrowLeft size={20} />
            </button>

            {detailStep === "preview" ? (
              <>
                <div className="mt-6 flex h-[258px] items-center justify-center rounded-[28px] bg-[#D9E2EE]">
                  <HomeSideIcon size={94} className="text-[#667792]" />
                </div>

                <h3 className="mt-7 text-[18px] font-bold leading-[1.18] text-[#101828]">
                  {t(selectedNotification.previewTitleKey)}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.35] text-[#101828]">
                  {t(selectedNotification.previewDescriptionKey)}
                </p>

                <button
                  type="button"
                  onClick={handleOpenDetails}
                  className="mt-7 flex h-[56px] w-full items-center justify-center rounded-[16px] bg-[linear-gradient(90deg,_#1DA1F2_0%,_#1565F9_100%)] px-6 text-[17px] font-semibold text-white transition-opacity hover:opacity-95"
                >
                  {t("notificationDetailsButton")}
                </button>
              </>
            ) : (
              <>
                <div className="mt-6 overflow-hidden rounded-[28px] bg-[#F3F7FC]">
                  <div className="p-3 pb-0">
                    <PassportPreview
                      card={{
                        propertyType: selectedNotification.detailCard.propertyType,
                        cadastre: selectedNotification.detailCard.cadastre,
                        address: selectedNotification.detailCard.address,
                      }}
                      className="w-full rounded-[24px]"
                    />
                  </div>
                  <div className="px-3 pb-3">
                    <div className="rounded-b-[20px] bg-white py-3 text-center text-[14px] font-bold uppercase leading-none text-[#101828]">
                      {t(selectedNotification.detailCard.statusKey)}
                    </div>
                  </div>
                </div>

                <h3 className="mt-7 text-[18px] font-bold leading-[1.18] text-[#101828]">
                  {t(selectedNotification.previewTitleKey)}
                </h3>

                <p className="mt-3 text-[14px] leading-[1.35] text-[#101828]">
                  {t(selectedNotification.previewDescriptionKey)}
                </p>

                <div className="mt-6 rounded-[22px] bg-[#F7F9FC] px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="min-w-[130px] text-[12px] font-medium leading-5 text-[#667085]">
                      {t("fullName")}
                    </span>
                    <span className="text-right text-[12px] font-bold leading-5 text-[#101828]">
                      {selectedNotification.detailCard.fullName}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <span className="min-w-[130px] text-[12px] font-medium leading-5 text-[#667085]">
                      {t("sendDateTime")}
                    </span>
                    <span className="text-right text-[12px] font-bold leading-5 text-[#101828]">
                      {selectedNotification.detailCard.sentAt}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <span className="min-w-[130px] text-[12px] font-medium leading-5 text-[#667085]">
                      {t("cadastreNumber")}
                    </span>
                    <span className="text-right text-[12px] font-bold leading-5 text-[#101828]">
                      {selectedNotification.detailCard.cadastreLabel}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <span className="min-w-[130px] text-[12px] font-medium leading-5 text-[#667085]">
                      {t("addressLabel")}
                    </span>
                    <span className="text-right text-[12px] font-bold leading-5 text-[#101828]">
                      {selectedNotification.detailCard.addressText}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={handleRequestAction}
                    className="flex h-[56px] flex-1 items-center justify-center rounded-[16px] bg-[#E8EEF7] px-4 text-[17px] font-semibold text-[#101828] transition-colors hover:bg-[#dde6f2]"
                  >
                    {t("statusRejected")}
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestAction}
                    className="flex h-[56px] flex-1 items-center justify-center rounded-[16px] bg-[linear-gradient(90deg,_#1DA1F2_0%,_#1565F9_100%)] px-4 text-[17px] font-semibold text-white transition-opacity hover:opacity-95"
                  >
                    {t("statusAccepted")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {deleteCandidateId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F172A]/30 px-4">
          <div className="w-full max-w-[590px] rounded-[28px] bg-white px-6 pb-11 pt-8 shadow-[0_32px_80px_rgba(15,23,42,0.22)]">
            <DeleteTrashIllustration className="mx-auto h-[94px] w-[94px]" />

            <h3 className="mt-8 text-center text-[22px] font-bold leading-none text-[#101828]">
              {t("delete")}?
            </h3>

            <p className="mx-auto mt-4 max-w-[460px] text-center text-[15px] font-semibold leading-[1.45] text-[#5B6B86]">
              {t("notificationDeleteConfirm")}
            </p>

            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="mt-8 w-full rounded-[14px] bg-[linear-gradient(90deg,_#1DA1F2_0%,_#1565F9_100%)] px-6 py-4 text-[17px] font-semibold text-white transition-opacity hover:opacity-95"
            >
              {t("continue")}
            </button>

            <button
              type="button"
              onClick={handleDeleteCancel}
              className="mt-7 block w-full text-center text-[16px] font-semibold text-[#101828]"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarNotificationButton;
