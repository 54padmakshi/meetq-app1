// src/components/MoodBoard.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MoodBoard = () => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [textItems, setTextItems] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newImages).then((urls) => {
      setImages((prevImages) => [...prevImages, ...urls]);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleAddText = () => {
    if (text.trim()) {
      setTextItems((prev) => [...prev, text.trim()]);
      setText('');
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteText = (index) => {
    setTextItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mood-board">
      <h2>Create Your Mood Board</h2>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop some images here, or click to select files</p>
      </div>
      <div className="canvas" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img src={image} alt={`Uploaded ${index}`} style={{ maxWidth: '100%', maxHeight: '300px' }} />
            <button onClick={() => handleDeleteImage(index)} style={{ position: 'absolute', top: '5px', right: '5px' }}>
              Delete
            </button>
          </div>
        ))}
        {textItems.map((item, index) => (
          <div key={index} style={{ position: 'absolute', top: `${50 + index * 30}px`, left: '10px' }}>
            {item}
            <button onClick={() => handleDeleteText(index)}>Delete</button>
          </div>
        ))}
      </div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your text here" />
      <button onClick={handleAddText}>Add Text</button>
    </div>
  );
};

export default MoodBoard;
