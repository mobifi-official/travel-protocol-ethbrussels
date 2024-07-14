export function DialogCloseIcon() {
    return (
        <>
            <svg className="hidden md:inline-block" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24 8L8 24" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 8L24 24" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 5L15 15" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    );
}