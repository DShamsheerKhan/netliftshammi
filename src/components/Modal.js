// Modal.js
import React, { useState, useEffect, useCallback } from 'react';
import './style/Modal.css';

const Modal = ({ isOpen, onClose, imageSrc }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const isVideo = imageSrc && imageSrc.match(/\.(mp4|webm|ogg)$/i);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        setScale(prevScale => Math.min(prevScale + 0.25, 3));
        break;
      case '-':
      case '_':
        setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
        break;
      case '0':
        setScale(1);
        setPosition({ x: 0, y: 0 });
        break;
      default:
        break;
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    // Reset zoom when modal opens or image changes
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prevScale => Math.min(prevScale + 0.25, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale(prevScale => Math.min(prevScale + 0.1, 3));
    } else {
      setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
    }
  };

  return (
    <div 
      className="modal-overlay-img" 
      onClick={onClose}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="modal-content-img" 
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        {isVideo ? (
          <video 
            controls 
            autoPlay
            className="modal-video-img"
          >
            <source src={imageSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src={imageSrc} 
            alt="Enlarged view" 
            className="modal-image-img" 
            style={{ 
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              cursor: dragging ? 'grabbing' : (scale > 1 ? 'grab' : 'default')
            }}
            onMouseDown={handleMouseDown}
          />
        )}
        <div className="zoom-controls">
          <button onClick={handleZoomOut} title="Zoom out">−</button>
          <button onClick={handleReset} style={{background: 'none' , margin:'0 10px '} } title="Reset zoom">Reset</button>
          <button onClick={handleZoomIn} title="Zoom in">+</button>
        </div>
        {/* <button className="close-button" onClick={onClose} title="Close (Esc)">×</button> */}
      </div>
    </div>
  );
};

export default Modal;