import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface ButtonWithImageProps {
  text: string;
  imageSrc: string | StaticImageData;
  link: string;
}
const ButtonWithImage: React.FC<ButtonWithImageProps> = ({
  text,
  imageSrc,
  link,
}) => {
  return (
    <Link href={link}>
      <button type="button" className="buttonWithImage">
        <Image
          src={imageSrc as string}
          alt="Button Icon"
          style={{ marginBottom: "20px", height: "75px", width: "75px" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "30px" }}>{text}</span>
      </button>
    </Link>
  );
};

export default ButtonWithImage;
