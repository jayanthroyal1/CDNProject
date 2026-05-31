import sharp from "sharp";

export const processImage = async (filePath) => {
  const metadata = await sharp(filePath).metadata();

  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
  };
};
