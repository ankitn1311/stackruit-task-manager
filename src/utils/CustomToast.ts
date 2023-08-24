import toast from "react-hot-toast";

export interface ToastProps {
  content?: string;
  id?: string;
}

export interface ToastErrorProps extends ToastProps {
  errorResponse?: any;
}

export interface ToastInfoProps {
  content: string;
  id?: string;
}

export const CustomToast = {
  error: ({ content, errorResponse, id }: ToastErrorProps) => {
    // const errorMessage =
    // errorResponse?.customMsg || errorResponse?.error?.customMsg || ''
    const message =
      // content || errorMessage || 'Something went wrong! Please try again.'
      content || "Something went wrong! Please try again.";

    toast.error(message, id ? { id } : {});
  },
  success: ({ content, id }: ToastProps) => {
    const message = content || "Success !";

    toast.success(message, id ? { id } : {});
  },
  info: ({ content, id }: ToastInfoProps) => {
    const message = content || "";

    if (content) {
      toast(message, {
        ...(id ? { id } : {}),
        style: {
          textAlign: "center",
          border: "1px solid #d6a261",
          background: "#f5f7ff",
          color: "#d6a261",
        },
      });
    }
  },
};
