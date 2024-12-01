import React, { useEffect, useState } from "react";

const FileViewer = ({ theFile, handleView, handleSubmit }) => {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);


    useEffect(() => {
        if (theFile) {
            const selectedFile = theFile;
            setFile(selectedFile);
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target.result;
                setFileContent(result);
                console.log("File content set:");
            };


            if (selectedFile.type.includes("image")) {
                reader.readAsDataURL(selectedFile); // for images
            } else if (selectedFile.type.includes("text")) {
                reader.readAsText(selectedFile); // for text files
            } else if (selectedFile.type.includes("pdf")) {
                reader.readAsDataURL(selectedFile); // for PDFs
            } else if (selectedFile.type.includes("audio") || selectedFile.type.includes("video")) {
                reader.readAsDataURL(selectedFile); // for audio and video files
            } else {
                reader.readAsArrayBuffer(selectedFile); // Other file types
            }
        }
    }, [theFile]);

    const renderFile = () => {
        if (!file) return null;

        if (file.type.includes("image")) {
            return <img src={fileContent} alt="Selected File" style={{ maxHeight: "100%" }} />;
        } else if (file.type.includes("text")) {
            return <pre>{fileContent}</pre>;
        } else if (file.type.includes("pdf")) {
            return (
                <iframe
                    src={fileContent}
                    title="PDF Viewer"
                    style={{ width: "100%", height: "100%" }}
                ></iframe>
            );
        } else if (file.type.includes("audio")) {
            return (
                <audio controls style={{ width: "100%" }}>
                    <source src={fileContent} type={file.type} />
                    Your browser does not support the audio element.
                </audio>
            );
        } else if (file.type.includes("video")) {
            return (
                <video controls style={{ width: "100%" }}>
                    <source src={fileContent} type={file.type} />
                    Your browser does not support the video element.
                </video>
            );
        } else {
            return <p>Unsupported file type</p>;
        }
    };

    return (
        <div className="fileViewer z-40 fixed top-1/4 left-32 items-center h-1/2 w-1/2 p-3 rounded-lg flex-center gap-2 flex-col">
            <div className="fileViewer_content h-full w-full border bg-slate-500 rounded-lg p-2 flex-center">
                {renderFile()}
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleView}
                    className="px-4 bg-red-500 rounded text-white py-2 active:scale-[0.85]"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 bg-blue-700 rounded ml-4 text-white py-2 active:scale-[0.85]"
                >
                    Ok
                </button>
            </div>
        </div>
    );
};

export default FileViewer;
