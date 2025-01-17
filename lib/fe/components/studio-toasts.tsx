import { Toast } from "flowbite-react";
import {
  HiOutlineCheck,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiX,
} from "react-icons/hi";
import { IconType } from "react-icons";
import { tw } from "twind";
import React, { useState } from "react";

type ToastType = "success" | "failure" | "info" | "warning";

export interface StudioToastProps {
  children: React.ReactNode;
  onDismiss?: () => void;
  type: ToastType;
}

export const StudioToasts = ({ toasts }: { toasts: StudioToastProps[] }) => {
  return (
    <div className={tw("fixed top-5 right-5 z-50")}>
      {toasts.map((toast, idx) => (
        <StudioToast key={idx} {...toast} />
      ))}
    </div>
  );
};

export const StudioToast = ({
  type,
  children,
  onDismiss,
}: StudioToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <Toast className={tw("mb-3")}>
      {renderIcon(type)}
      <div className={tw("ml-3 text-sm font-normal")}>{children}</div>
      <Toast.Toggle
        onDismiss={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
      />
    </Toast>
  );
};

const renderIcon = (type: ToastType) => {
  let icon: IconType | null = null;
  let iconColorClass: string = "";
  switch (type) {
    case "success":
      icon = HiOutlineCheck;
      iconColorClass = "bg-green-100 text-green-500";
      break;
    case "failure":
      icon = HiX;
      iconColorClass = "bg-red-100 text-red-500";
      break;
    case "info":
      icon = HiOutlineInformationCircle;
      iconColorClass = "bg-blue-100 text-blue-500";
      break;
    case "warning":
      icon = HiOutlineExclamation;
      iconColorClass = "bg-yellow-100 text-yellow-500";
      break;
  }

  return (
    <div
      className={tw([
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
        iconColorClass,
      ])}
    >
      {React.createElement(icon, {
        className: tw("h-5 w-5"),
      })}
    </div>
  );
};
