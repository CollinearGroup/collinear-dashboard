import Jimp from "jimp"

const RATIO_WIDTH = 16
const RATIO_HEIGHT = 9

export const defaultCrop = async (filePath: string, outFilePath: string) => {
  const image = await Jimp.read(filePath)
  const autoCroppedImage = image.clone().autocrop(0.01)
  const squaredImage = cropToAspectRatio(autoCroppedImage)
  return squaredImage.writeAsync(outFilePath)
}

export const cropToAspectRatio = (image: Jimp) => {
  const width = image.getWidth()
  const height = image.getHeight()
  const heightAtAspect = (width / RATIO_WIDTH) * RATIO_HEIGHT
  if (height > heightAtAspect) {
    const edgeToCrop = (height - heightAtAspect) / 2
    return image.crop(0, edgeToCrop, width, heightAtAspect)
  }
  return image.crop(0, 0, width, heightAtAspect)
}
