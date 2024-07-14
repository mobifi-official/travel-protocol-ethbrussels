import toast, { Toast } from 'react-hot-toast';

/**
 * Enum for Toast message types.
 */
export enum ToastMessageType {
    error, 
    success, 
    actionInProgress,
}

/**
 * Creates a custom toast element based on specified parameters.
 * 
 * @param {object} params - Parameters for the custom toast.
 * @param {ToastMessageType} params.toastType - Type of the toast message.
 * @param {string} [params.message] - Message to be displayed in the toast.
 * @param {JSX.Element} [params.richMessage] - Rich JSX element to be displayed instead of a simple text message.
 * @param {Toast} params.toastReference - Reference to the toast instance for interaction.
 * @param {string} [params.className='top-[68px]'] - Additional CSS classes for styling the toast.
 * @returns {JSX.Element} JSX element representing the custom toast.
 */
const getCustomToast = ({ toastType, message, richMessage, toastReference, className = `top-[68px]` }: { toastType: ToastMessageType, message?: string, richMessage?: JSX.Element, toastReference: Toast, className?: string }): JSX.Element => {

    const messageSection = richMessage ? richMessage : <p className="text-black customToastMessageText flex-1">{message}</p>;
    switch (toastType) {
        case ToastMessageType.error:
            return (
                <div className={`${toastReference.visible ? 'animate-appearance-in' : 'animate-appearance-out'} customToast border-red1 ${className}`}>
                    <svg className="hidden md:inline-block" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <mask id="mask0_2160_53791" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
                            <rect width="80" height="80" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_2160_53791)">
                            <path d="M39.988 57.8437C41.0879 57.8437 41.996 57.4975 42.7122 56.8052C43.4283 56.1128 43.7864 55.2166 43.7864 54.1167C43.7864 53.0168 43.4324 52.1009 42.7243 51.3689C42.0163 50.637 41.1123 50.2711 40.0123 50.2711C38.9125 50.2711 38.0044 50.6365 37.2882 51.3675C36.572 52.0984 36.2139 53.0138 36.2139 54.1137C36.2139 55.2137 36.568 56.1103 37.276 56.8037C37.9841 57.497 38.8881 57.8437 39.988 57.8437ZM40.2648 43.9632C41.1971 43.9632 41.9779 43.6451 42.6071 43.0089C43.2363 42.3727 43.5509 41.5906 43.5509 40.6624V25.3798C43.5509 24.4517 43.2315 23.6695 42.5925 23.0333C41.9535 22.3972 41.1679 22.0791 40.2356 22.0791C39.3033 22.0791 38.5225 22.3972 37.8933 23.0333C37.264 23.6695 36.9494 24.4517 36.9494 25.3798V40.6624C36.9494 41.5906 37.2689 42.3727 37.9078 43.0089C38.5468 43.6451 39.3325 43.9632 40.2648 43.9632ZM40.0288 74.5103C35.2398 74.5103 30.7535 73.6105 26.57 71.8108C22.3866 70.011 18.7271 67.5434 15.5916 64.408C12.4561 61.2725 9.98856 57.6131 8.18884 53.4298C6.38912 49.2465 5.48926 44.758 5.48926 39.9642C5.48926 35.1705 6.38912 30.6798 8.18884 26.4922C9.98856 22.3045 12.4537 18.6561 15.5843 15.5467C18.7148 12.4374 22.3728 9.97585 26.5584 8.16207C30.744 6.3483 35.235 5.44141 40.0314 5.44141C44.8278 5.44141 49.3217 6.34707 53.513 8.15841C57.7043 9.96974 61.3535 12.428 64.4605 15.5332C67.5675 18.6383 70.0272 22.2898 71.8396 26.4875C73.652 30.6852 74.5582 35.1818 74.5582 39.9772C74.5582 44.7706 73.6513 49.2588 71.8375 53.4418C70.0237 57.6248 67.5622 61.2769 64.4528 64.3983C61.3435 67.5198 57.6928 69.9855 53.5007 71.7954C49.3085 73.6054 44.8179 74.5103 40.0288 74.5103ZM40.0418 67.9088C47.7773 67.9088 54.3558 65.194 59.7773 59.7645C65.1988 54.3349 67.9096 47.7327 67.9096 39.9577C67.9096 32.2222 65.204 25.6437 59.7929 20.2222C54.3819 14.8007 47.7764 12.09 39.9766 12.09C32.2532 12.09 25.6747 14.7955 20.2411 20.2067C14.8075 25.6177 12.0908 32.2232 12.0908 40.023C12.0908 47.7464 14.8055 54.3249 20.2351 59.7585C25.6646 65.1921 32.2669 67.9088 40.0418 67.9088Z" fill="#D0323C" />
                        </g>
                    </svg>
                    <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <mask id="mask0_1966_20899" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                            <rect width="30" height="30" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_1966_20899)">
                            <path d="M14.9954 21.6916C15.4079 21.6916 15.7484 21.5618 16.017 21.3022C16.2856 21.0425 16.4198 20.7065 16.4198 20.294C16.4198 19.8815 16.2871 19.5381 16.0216 19.2636C15.756 18.9891 15.417 18.8519 15.0046 18.8519C14.5921 18.8519 14.2516 18.9889 13.983 19.2631C13.7144 19.5371 13.5802 19.8804 13.5802 20.2929C13.5802 20.7054 13.7129 21.0416 13.9784 21.3016C14.244 21.5616 14.583 21.6916 14.9954 21.6916ZM15.0992 16.4864C15.4488 16.4864 15.7416 16.3671 15.9776 16.1286C16.2136 15.89 16.3315 15.5967 16.3315 15.2486V9.51768C16.3315 9.16964 16.2117 8.87632 15.9721 8.63774C15.7325 8.39918 15.4379 8.2799 15.0883 8.2799C14.7387 8.2799 14.4459 8.39918 14.2099 8.63774C13.974 8.87632 13.856 9.16964 13.856 9.51768V15.2486C13.856 15.5967 13.9758 15.89 14.2154 16.1286C14.455 16.3671 14.7496 16.4864 15.0992 16.4864ZM15.0108 27.9416C13.2149 27.9416 11.5325 27.6042 9.96369 26.9293C8.3949 26.2544 7.0226 25.329 5.84679 24.1532C4.67099 22.9774 3.74565 21.6052 3.07075 20.0364C2.39586 18.4677 2.05841 16.7845 2.05841 14.9868C2.05841 13.1892 2.39586 11.5052 3.07075 9.9348C3.74565 8.36445 4.67008 6.99627 5.84404 5.83027C7.01797 4.66427 8.38974 3.74119 9.95935 3.06102C11.5289 2.38086 13.2131 2.04077 15.0117 2.04077C16.8104 2.04077 18.4956 2.3804 20.0673 3.05965C21.6391 3.7389 23.0075 4.66074 24.1726 5.82518C25.3378 6.98962 26.2601 8.35891 26.9398 9.93305C27.6194 11.5072 27.9593 13.1934 27.9593 14.9917C27.9593 16.7892 27.6192 18.4723 26.939 20.0409C26.2588 21.6095 25.3358 22.9791 24.1698 24.1496C23.0038 25.3202 21.6347 26.2448 20.0627 26.9235C18.4906 27.6023 16.8067 27.9416 15.0108 27.9416ZM15.0156 25.4661C17.9164 25.4661 20.3834 24.448 22.4164 22.4119C24.4495 20.3758 25.466 17.9 25.466 14.9844C25.466 12.0836 24.4515 9.61665 22.4223 7.58358C20.3931 5.55052 17.9161 4.53399 14.9912 4.53399C12.0949 4.53399 9.62795 5.54857 7.59035 7.57774C5.55277 9.60689 4.53397 12.0839 4.53397 15.0089C4.53397 17.9051 5.55202 20.3721 7.5881 22.4097C9.62418 24.4473 12.1 25.4661 15.0156 25.4661Z" fill="#D0323C" />
                        </g>
                    </svg>
                    {messageSection}
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="hidden md:inline-block cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M30 10L10 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10L30 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="md:hidden cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 5L15 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            );
        case ToastMessageType.actionInProgress:
            return (
                <div className={`${toastReference.visible ? 'animate-appearance-in' : 'animate-appearance-out'} customToast border-green5 ${className}`}>
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-[30px] h-[30px] md:w-[80px] md:h-[80px] text-gray-200 animate-spin dark:text-gray-600 fill-green5" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    {messageSection}
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="hidden md:inline-block cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M30 10L10 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10L30 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="md:hidden cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 5L15 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            );
        case ToastMessageType.success:
            return (
                <div className={`${toastReference.visible ? 'animate-appearance-in' : 'animate-appearance-out'} customToast border-green5 ${className}`}>
                    <svg className="hidden md:inline-block" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path d="M49.066 29.3003L34.766 43.6337L29.266 38.1337C28.9672 37.7847 28.5995 37.5013 28.1859 37.3012C27.7724 37.1012 27.3219 36.9887 26.8629 36.971C26.4038 36.9533 25.946 37.0306 25.5183 37.1982C25.0905 37.3658 24.702 37.62 24.3772 37.9448C24.0523 38.2697 23.7982 38.6582 23.6306 39.0859C23.463 39.5137 23.3856 39.9714 23.4034 40.4305C23.4211 40.8896 23.5335 41.34 23.7336 41.7536C23.9337 42.1671 24.2171 42.5348 24.566 42.8337L32.3994 50.7003C32.7108 51.0093 33.0802 51.2537 33.4863 51.4196C33.8925 51.5854 34.3273 51.6695 34.766 51.667C35.6405 51.6633 36.4785 51.3161 37.0994 50.7003L53.766 34.0337C54.0785 33.7238 54.3264 33.3551 54.4957 32.9489C54.6649 32.5427 54.752 32.107 54.752 31.667C54.752 31.227 54.6649 30.7913 54.4957 30.3851C54.3264 29.9789 54.0785 29.6102 53.766 29.3003C53.1415 28.6795 52.2966 28.331 51.416 28.331C50.5354 28.331 49.6906 28.6795 49.066 29.3003ZM39.9994 6.66699C33.4067 6.66699 26.962 8.62196 21.4804 12.2847C15.9987 15.9474 11.7263 21.1533 9.20338 27.2442C6.68046 33.3351 6.02035 40.0373 7.30652 46.5033C8.5927 52.9694 11.7674 58.9088 16.4291 63.5706C21.0909 68.2323 27.0303 71.407 33.4964 72.6932C39.9624 73.9793 46.6646 73.3192 52.7555 70.7963C58.8463 68.2734 64.0523 64.001 67.715 58.5193C71.3777 53.0377 73.3327 46.593 73.3327 40.0003C73.3327 35.6229 72.4705 31.2884 70.7953 27.2442C69.1202 23.2 66.6649 19.5254 63.5696 16.4301C60.4743 13.3348 56.7997 10.8795 52.7555 9.20434C48.7113 7.52918 44.3768 6.66699 39.9994 6.66699ZM39.9994 66.667C34.7252 66.667 29.5695 65.103 25.1842 62.1728C20.7988 59.2427 17.3809 55.0779 15.3626 50.2052C13.3442 45.3325 12.8162 39.9707 13.8451 34.7979C14.874 29.6251 17.4138 24.8735 21.1432 21.1441C24.8726 17.4147 29.6241 14.875 34.797 13.8461C39.9698 12.8171 45.3316 13.3452 50.2043 15.3635C55.077 17.3819 59.2417 20.7998 62.1719 25.1851C65.1021 29.5704 66.666 34.7262 66.666 40.0003C66.666 47.0728 63.8565 53.8555 58.8555 58.8565C53.8546 63.8575 47.0718 66.667 39.9994 66.667Z" fill="#30880B" />
                    </svg>
                    <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M18.4 10.9875L13.0375 16.3625L10.975 14.3C10.8629 14.1691 10.725 14.0629 10.57 13.9878C10.4149 13.9128 10.246 13.8707 10.0738 13.864C9.90167 13.8574 9.73001 13.8864 9.5696 13.9492C9.40919 14.012 9.26351 14.1074 9.14169 14.2292C9.01987 14.351 8.92455 14.4967 8.86171 14.6571C8.79887 14.8175 8.76986 14.9892 8.77651 15.1613C8.78316 15.3335 8.82532 15.5024 8.90035 15.6575C8.97538 15.8125 9.08165 15.9504 9.21251 16.0625L12.15 19.0125C12.2668 19.1284 12.4053 19.22 12.5576 19.2822C12.7099 19.3444 12.873 19.376 13.0375 19.375C13.3654 19.3736 13.6797 19.2434 13.9125 19.0125L20.1625 12.7625C20.2797 12.6463 20.3727 12.508 20.4361 12.3557C20.4996 12.2034 20.5323 12.04 20.5323 11.875C20.5323 11.71 20.4996 11.5466 20.4361 11.3943C20.3727 11.242 20.2797 11.1037 20.1625 10.9875C19.9283 10.7547 19.6115 10.624 19.2813 10.624C18.951 10.624 18.6342 10.7547 18.4 10.9875ZM15 2.5C12.5277 2.5 10.111 3.23311 8.05538 4.60663C5.99976 5.98015 4.39761 7.93238 3.45151 10.2165C2.50542 12.5005 2.25787 15.0139 2.74019 17.4386C3.2225 19.8634 4.41301 22.0907 6.16117 23.8388C7.90933 25.587 10.1366 26.7775 12.5614 27.2598C14.9861 27.7421 17.4995 27.4946 19.7836 26.5485C22.0676 25.6024 24.0199 24.0002 25.3934 21.9446C26.7669 19.889 27.5 17.4723 27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7836 3.45151C18.267 2.82332 16.6415 2.5 15 2.5ZM15 25C13.0222 25 11.0888 24.4135 9.4443 23.3147C7.79981 22.2159 6.51809 20.6541 5.76121 18.8268C5.00433 16.9996 4.8063 14.9889 5.19215 13.0491C5.57801 11.1093 6.53041 9.32746 7.92894 7.92893C9.32746 6.53041 11.1093 5.578 13.0491 5.19215C14.9889 4.8063 16.9996 5.00433 18.8268 5.7612C20.6541 6.51808 22.2159 7.79981 23.3147 9.4443C24.4135 11.0888 25 13.0222 25 15C25 17.6522 23.9464 20.1957 22.0711 22.0711C20.1957 23.9464 17.6522 25 15 25Z" fill="#30880B" />
                    </svg>
                    {messageSection}
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="hidden md:inline-block cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M30 10L10 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10L30 30" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toast.dismiss(toastReference.id);
                        }}
                        className="md:hidden cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 5L15 15" stroke="#767676" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            );
        default: return (<></>);
    }
}



/**
 * Displays a custom toast using react-hot-toast's toast.custom method.
 * 
 * @param {object} params - Parameters for displaying the toast.
 * @param {string} [params.message] - Simple message to be displayed in the toast.
 * @param {JSX.Element} [params.richMessage] - Rich JSX message to be displayed in the toast.
 * @param {ToastMessageType} params.typeOfToast - Type of the toast to be displayed.
 * @param {string} [params.className] - Additional CSS classes for styling the toast.
 * @param {number} [params.duration=5000] - Duration for which the toast should be visible.
 * @returns {string} string representing the ID of the displayed toast.
 */
export const showCustomToast = ({ message, typeOfToast, richMessage, className, duration = 5000 }: { message?: string, richMessage?: JSX.Element, typeOfToast: ToastMessageType, className?: string, duration?: number }): string => {
   const shownToast = toast.custom((t) =>
        getCustomToast({ toastReference: t, message, richMessage, toastType: typeOfToast, className }),
        // Here, we provide further customization to the toast, for instance, its duration
        { duration }
    );

    return shownToast;
}