import Jimp from "jimp";

export const defaultCrop = async (filePath: string, outFilePath: string) => {
  const image = await Jimp.read(filePath)
  const autoCroppedImage = image.clone().autocrop(0.01)
  const squaredImage = cropToSquare(autoCroppedImage)
  return squaredImage.writeAsync(outFilePath)
}

export const cropToSquare = (image: Jimp) => {
  if (image.getWidth() > image.getHeight()) {
    return cropToWidth(image)
  }
  return cropToHeight(image)
}

export const cropToWidth = (image: Jimp): Jimp => {
  const edgeToCrop = (image.getWidth() - image.getHeight()) / 2
  const x = edgeToCrop
  const y = 0
  const width = image.getHeight()
  const height = image.getHeight()
  return image.crop(x, y, width, height)
}

export const cropToHeight = (image: Jimp): Jimp => {
  const edgeToCrop = (image.getHeight() - image.getWidth()) / 2
  const x = 0
  const y = edgeToCrop
  const width = image.getWidth()
  const height = image.getWidth()
  return image.crop(x, y, width, height)
}
