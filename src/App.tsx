import React, { useRef, useState } from 'react';
import './App.scss';

function App() {
  const [dragOver, setDragOver] = useState(false);
  const [fileUpload, setFile] = useState<any | null>(null);

  const fileRef = useRef<any | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    setFile(file);
  };

  const handleCancelUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFile(null);
  };

  const uploadText = fileUpload
    ? <div className="form-files">
            <h4>{
                fileUpload.name
            }</h4>
            <button
                onClick={handleCancelUpload}
            >
                Cancel
            </button>
            <input ref={fileRef}
                   id="uploadNewFile"
                   type="file"
                   onChange={handleAddFile}/>
            <label htmlFor="uploadNewFile">Upload</label>
        </div>
    : <>
            <h2>Drop files here</h2>
            <span>Or</span>
            <form action="">
                <input type="file"
                       ref={fileRef}
                       id="upload"
                       name="upload"
                       onChange={handleAddFile}
                />
                <label htmlFor="upload">Select Files</label>
            </form>
        </>;

  return (
        <div className="form"
             onDrop={handleDrop}
             onDragEnter={handleDragEnter}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}>
            {uploadText}
        </div>
  );
}

export default App;
