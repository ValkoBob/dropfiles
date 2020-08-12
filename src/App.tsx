import React, { useRef, useState } from 'react';
import './App.scss';

const App: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileUpload, setFile] = useState<typeof fileRef.current | null | File | undefined>(null);
  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (fileRef.current !== null) {
      const file = fileRef.current.files![0];
      setFile(file);
    }
  };

  const handleCancelUpload = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setFile(null);
  };

  return (
    <div className="form"
         onDrop={handleDrop}
         onDragEnter={handleDragEnter}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}>
      {fileUpload ? <div className="form-files">
          <h4>{fileUpload.name}</h4>
          <button onClick={handleCancelUpload}>Cancel</button>
          <input ref={fileRef} id="uploadNewFile" type="file" onChange={handleAddFile}/>
          <label htmlFor="uploadNewFile">Upload</label>
        </div>
        : <>
          <h2>Drop files here</h2>
          <span>Or</span>
          <form>
            <input type="file" ref={fileRef} id="upload" name="upload" onChange={handleAddFile}/>
            <label htmlFor="upload">Select Files</label>
          </form>
        </>}
    </div>
  );
};

export default App;
