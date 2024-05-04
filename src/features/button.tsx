import React from "react"

interface ButtonProps {
  icon: string
  text: string
  primary?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ icon, text, primary, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex p-3 ${primary ? "bg-blue-500" : "bg-white border-[1px] border-solid border-slate-500"} w-fit rounded-md`}>
      <div className="flex justify-center items-center">
        <img className="h-6 w-6 mr-2" src={icon} alt="button-icon" />
        <span className={primary ? "text-white" : "text-black"}>{text}</span>
      </div>
    </button>
  )
}

export default Button
