const showSuccessModal = (text, func) => {
  func(text);

  setTimeout(() => {
    func("");
  }, 3000);
};

export default showSuccessModal;
