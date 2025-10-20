import Compressor from 'compressorjs';

function compressImage(file: File): Promise<File> {
  console.log('raw', file.size);
  return new Promise((resolve) => {
    new Compressor(file, {
      quality: 0.8,
      mimeType: 'image/jpeg',
      success: (output: File) => {
        console.log('optimized', output.size);
        resolve(output);
      },
    });
  });
}

export default compressImage;
