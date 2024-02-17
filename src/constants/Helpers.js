//flatten array of arrays
export function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

//get object nested value from string, (e.g: 'person.name')
export function getNestedValue({ key, obj }) {
  return key.split(".").reduce(function (row, prop) {
    return row && row[prop];
  }, obj);
}

export function getTableDataCellWidth(width, field, columns, actions) {
  const actionsColumnWidth = actions.length * 32,
    finalActionsColumnsWidth =
      actionsColumnWidth > 100 ? actionsColumnWidth : 100;

  return width
    ? width
    : field === "actionsCol"
    ? finalActionsColumnsWidth
    : `calc((100% - ${
        columns.some((el) => el.field === "actionsCol")
          ? `${finalActionsColumnsWidth}px`
          : "0"
      }) / ${
        columns.some((el) => el.field === "actionsCol")
          ? columns.length - 1
          : columns.length
      })`;
}

export function createWrapperAndAppendToBody(wrapper, wrapperElementId) {
  const wrapperElement = document.createElement(wrapper);
  wrapperElement.setAttribute("id", wrapperElementId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const regex = /(auto|scroll)/;

const style = (node, prop) =>
  getComputedStyle(node, null).getPropertyValue(prop);

const scroll = (node) =>
  regex.test(
    style(node, "overflow") +
      style(node, "overflow-y") +
      style(node, "overflow-x")
  );

// get the first scrollable parent
export const getScrollParent = (node) =>
  !node || node === document.body
    ? document.body
    : scroll(node)
    ? node
    : getScrollParent(node.parentNode);

// get {top, left} of the required element
export function getElementOffset(el) {
  let _x = 0,
    _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}
