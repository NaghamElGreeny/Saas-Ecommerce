import Image, { StaticImageData } from "next/image";

interface OverlappingImagesProps {
  images: string[]|StaticImageData[];
  size?: number;
  overlap?: number;
}
const OverlappingImages: React.FC<OverlappingImagesProps> = ({
  images,
  size = 50,
  overlap = size * 0.2,
}) => {
  const containerWidth = size + (images.length - 1) * (size - overlap);

  return (
    <div
      className="relative"
      style={{
        width: containerWidth,
        height: size,
      }}
    >
      {images.map((imageSrc, index) => (
        <span
          key={index}
          className="absolute overflow-hidden rounded-full border-[3px] border-backgroud"
          style={{
            left: index * (size - overlap),
            width: size,
            height: size,
          }}
        >
          <Image
            src={imageSrc}
            width={size}
            height={size}
            className="h-full w-full object-cover"
            alt={`Image ${index + 1}`}
          />
        </span>
      ))}
    </div>
  );
};

export default OverlappingImages;