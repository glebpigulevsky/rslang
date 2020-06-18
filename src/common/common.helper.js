const createAnyDomElement = ({
  elem, classList = [], id = null, dataAttributeList = [], textContent = null,
}) => {
  const item = document.createElement(elem);
  if (classList.length > 0) {
    item.classList.add(...classList);
  }
  if (dataAttributeList.length > 0) {
    dataAttributeList.map((x) => item.setAttribute(x.name, x.value));
  }
  if (id !== null) {
    item.id = id;
  }
  if (textContent !== null) {
    item.textContent = textContent;
  }
  return item;
};

export {
  createAnyDomElement,
};
