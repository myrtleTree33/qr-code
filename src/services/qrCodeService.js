import QRCode from 'qrcode';
import { createCanvas, loadImage, Image } from 'canvas';

export const genQrCodeCanvas = async ({ text, width }) => {
  const canvas = createCanvas(width, width);
  // return QRCode.toDataURL(text, { width: width || 100 });
  return QRCode.toCanvas(canvas, text, { width });
};

export const overlayLogo = async ({ canvas, logoB64Str, width }) => {
  const ctx = canvas.getContext('2d');
  // const logoWidth = width * 0.2;

  const logoLen = 0.2 * width;

  const logo = new Image();
  logo.src = 'data:image/png;base64,' + logoB64Str;
  const { naturalWidth, naturalHeight } = logo;

  if (naturalWidth > naturalHeight) {
    const logoWidth = logoLen;
    const logoHeight = (naturalHeight / naturalWidth) * logoLen;
    ctx.drawImage(
      logo,
      (width - logoWidth) / 2,
      (width - logoHeight) / 2,
      logoWidth,
      logoHeight
    );
  } else {
    const logoHeight = logoLen;
    const logoWidth = (naturalWidth / naturalHeight) * logoLen;
    ctx.drawImage(
      logo,
      (width - logoWidth) / 2,
      (width - logoHeight) / 2,
      logoWidth,
      logoHeight
    );
  }

  return Promise.resolve(canvas);
};
