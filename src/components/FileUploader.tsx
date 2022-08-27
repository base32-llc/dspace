export function FileUploader(props: { onUpload: (file: File) => void }) {
    return (
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-gray-700">
            <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
                type="file"
                className="hidden"
                onChange={(e) => {
                    if (!e.target.files) {
                        return;
                    }
                    const img = e.target.files[0];
                    props.onUpload(img);
                }}
            />
        </label>
    );
}