export const parseErrorMessage = (error: any) => {
    if (error.status === 0) {
      if (navigator.onLine) return 'حدث خطأ ما، يرجى المحاولة لاحقًا'
      else return 'يرجى التحقّق من الإتصال بالإنترنت وإعادة المحاولة'
    } else if (Array.isArray(error.error.message)) return error.error.message[0] 
    else return error.error.message
}