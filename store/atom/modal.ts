interface ModalAtom {
  message: string;
  toggle: boolean;
  show: () => void;
  showMessage: (message: string) => void;
  hide: () => void;
}

export const modal: ModalAtom = {
  message: "",
  toggle: false,
  show() {
    this.toggle = true;
  },
  showMessage(message: string) {
    this.message = message;
    this.toggle = true;
  },
  hide() {
    this.message = "";
    this.toggle = false;
  },
};
