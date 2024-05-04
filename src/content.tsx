import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect, useState } from "react";
import ModalOverlay from "~ModalMessage";
import AiIcon from "~assets/AI.svg";

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


const Content = () => {
  const [showModal, setShowModal] = useState(false);

  // checking for a class name on document
  // if exist, we will mount or unmount AI Icon based on focus
  // for tracking we have added event listeners
  useEffect(() => {
    const intervalId = setInterval(() => {
      const textBox = document.querySelector(".msg-form__contenteditable");
      if (textBox) {
        textBox.addEventListener("focus", handleFocus);
        textBox.addEventListener("blur", handleBlur);
        clearInterval(intervalId); // Stop checking once the class is found
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // method to mount AI Icon
  const handleFocus = () => {
    const textBox = document.querySelector(".msg-form__contenteditable"); // get the messageing text field on linkedIn
    const container = document.createElement("div");
    container.className = "ai-icon";
    container.setAttribute("style", "position:absolute; bottom:0; right:6rem;");//settting the icon button in text field
    const imgElement = document.createElement("img");//img of the icons in the div
    imgElement.src = AiIcon;//adding svg
    imgElement.alt = "ai-icon";
    imgElement.setAttribute("style", "width: 32px; height: 32px; cursor:pointer;");
    imgElement.addEventListener("click", () => setShowModal(true)); // open modal once clicked
    container.appendChild(imgElement);// rmeove the icon once clicked
    textBox?.appendChild(container);
  };

  // method to unmount AI Icon
  const handleBlur = () => {
    const textBox = document.querySelector(".msg-form__contenteditable");
    const container = textBox?.querySelector(".ai-icon");
    container?.remove();
  };

  return (
    <div>{showModal && <ModalOverlay />}</div>
  );
};

export default Content;