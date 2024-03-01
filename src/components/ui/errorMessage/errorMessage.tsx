import { ErrorTypeMessage } from "./type"

export const ErrorMessage = ({ message }: ErrorTypeMessage) => {
    return <div className="p-4 mb-4 mt-4 text-sm rounded-lg h-2" role="alert">
    <span className="font-medium text-red-800">
        {message}
    </span>
  </div>
}