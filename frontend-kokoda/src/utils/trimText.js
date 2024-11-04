import { useLayoutEffect } from "react";

export default function trimText(container, text, setText) {
  const testElement = document.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = 0;
  testElement.style.left = 0;
  container.appendChild(testElement);
  let length = 0;

  for (let i = 0; i < text.length; i++) {
    testElement.textContent += text[i];
    if (testElement.getBoundingClientRect().height > container.clientHeight) {
      length = i - 6;
      setText(text.slice(0, length) + "...");
      break;
    }
  }

  container.removeChild(testElement);
}
