import Icon from "data-base64:~assets/Vector.svg"
import type React from "react"

interface IconButtonProps {
    onClick?: () => void
    showIcon: boolean
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, showIcon }) => {
    return (
        <div onClick={onClick} className="hover:cursor-pointer">
            {showIcon && (
                <div
                    className={`w-12 h-12 rounded-full bg-white shadow-md justify-center items-center flex`}>
                    <img src={Icon} alt="button-icon" />
                </div>
            )}
        </div>
    )
}

export default IconButton
