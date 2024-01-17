import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';

interface ButtonWithImageProps {
  text: string;
  imageSrc: string | StaticImageData;
  onClick: () => void;
}

const ButtonWithImage: React.FC<ButtonWithImageProps> = ({ text, imageSrc, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#339f6b',
        background: 'white',
        width: '350px',
        height: '270px',
        margin: '10px',
        zIndex: 999,
        border: '3px solid #339f6b',
        borderRadius: '10px',
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <Image
        src={imageSrc as string}
        alt="Button Icon"
        style={{ marginBottom: '20px', height: '75px', width: '75px' }}
      />
      <span style={{ fontWeight: 'bold', fontSize: "30px" }}>{text}</span>
    </button>
  );
};

export default ButtonWithImage;
