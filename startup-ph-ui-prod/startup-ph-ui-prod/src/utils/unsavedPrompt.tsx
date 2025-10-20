import { confirmAlert } from "@/components/confirm-alert";

export default function unsavedPrompt(enabled: boolean, fn: () => void) {
  return () => {
    if (!enabled) {
      fn();
      return;
    }
    confirmAlert('You have unsaved changes, are you sure you want to leave this page?', {
      confirmLabel: 'Discard Changes',
      onConfirm: () => {
        fn();
      },
    });
  }
}