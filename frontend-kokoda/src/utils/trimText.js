import { useLayoutEffect } from "react";

export default function trimText(container, text, setText, lines = 1) {
  const testElement = document.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = 0;
  testElement.style.left = 0;
  testElement.style.textWrap = "nowrap";
  container.appendChild(testElement);
  let length = 0;

  for (let i = 0; i < text.length; i++) {
    testElement.textContent += text[i];
    /* console.log(
      testElement.getBoundingClientRect().width,
      container.clientWidth,
      text,
    ); */
    if (
      testElement.getBoundingClientRect().width >
      container.clientWidth * lines
    ) {
      length = i - 6 * lines;
      setText(text.slice(0, length) + "...");
      break;
    }
  }

  container.removeChild(testElement);
}
