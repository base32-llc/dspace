export function Modal(props: {
    title: string;
    form: JSX.Element;
    open: boolean;
    close: () => void;
}) {
    if (!props.open) {
        return <span />;
    }

    return (
        <>
            <div
                id="defaultModal"
                tabIndex={-1}
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
                aria-modal="true"
                role="dialog"
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {props.title}
                            </h3>
                            <button
                                type="button"
                                onClick={() => props.close()}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                data-modal-toggle="defaultModal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">{props.form}</div>
                    </div>
                </div>
            </div>
            <div
                modal-backdrop=""
                onClick={() => props.close()}
                className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
            ></div>
        </>
    );
}
