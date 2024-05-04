import GenerateIcon from "data-base64:~assets/generate.svg"
import InsertIcon from "data-base64:~assets/insert.svg"
import RegenerateIcon from "data-base64:~assets/regenerate.svg"
import cssText from "data-text:~style.css"
import type { PlasmoGetOverlayAnchor, PlasmoGetShadowHostId } from "plasmo"
import React, { useEffect, useRef, useState } from "react"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import Button from "~features/button"
import Input from "~features/input"
import MessageBox from "~features/message-box"

const generatedMessage ="Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
    document.querySelector(".msg-form__contenteditable")

// to optimize unmount lookups
export const getShadowHostId: PlasmoGetShadowHostId = () =>
    "msg-form__contenteditable-overlay"

const ModalOverlay: React.FC = () => {
    const [message, setMessage] = useState("") // message typed by the user
    const [showMessageBox, setShowMessageBox] = useState(false) // to show message bix
    const [userMessages, setUserMessages] = useState([]) //toshow user messges in messge box


    const handleGenerateButtonClick = () => {
        if (message.trim() !== "") {
            setShowMessageBox(true)
            setUserMessages([...userMessages, message.trim()])
            setMessage("")
        }
    }

    const resetValues = () => {
        setShowMessageBox(false)
        setUserMessages([])
        setMessage("")
        setShowModal(false)
    }

    const handleInsertButtonClick = () => {
        const messageForm: HTMLElement = document
            .querySelector(".msg-form__contenteditable")
            ?.querySelector("p")
        const messagePlaceholder: HTMLElement = document.querySelector(
            ".msg-form__placeholder"
        )
        messagePlaceholder?.classList?.remove("msg-form__placeholder")
        messageForm.innerHTML = generatedMessage
        resetValues()
    }

    const modalRef = useRef<HTMLDivElement | null>(null)

    const [showModal, setShowModal] = useStorage({
        key: "showModal",
        instance: new Storage({ area: "local" })
    })

    useEffect(() => {
        modalRef?.current?.addEventListener("click", () => {
            resetValues()
        })
    }, [showModal])

    return (
        <>
            <div className="absolute text-xl">
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-50 transition-opacity"
                        ref={modalRef}></div>
                    <div className="z-50 bg-white rounded-md shadow-md">
                        <div className="p-6 w-[550px] h-auto rounded-md shadow-md flex flex-col">
                            {showMessageBox ? (
                                <div className="h-auto w-full flex flex-col mb-4">
                                    <MessageBox text={userMessages[0]} />
                                    <MessageBox text={generatedMessage} generated />
                                </div>
                            ) : null}
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your Prompt"
                            />
                            <div className="mt-6 ml-auto">
                                {showMessageBox ? (
                                    <div className="flex gap-6">
                                        <Button
                                            onClick={handleInsertButtonClick}
                                            icon={InsertIcon}
                                            text="Insert"
                                        />
                                        <Button icon={RegenerateIcon} text="Regenerate" primary />
                                    </div>
                                ) : (
                                    <Button
                                        onClick={handleGenerateButtonClick}
                                        icon={GenerateIcon}
                                        text="Generate"
                                        primary
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalOverlay
