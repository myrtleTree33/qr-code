import QRCode from 'qrcode';
import { createCanvas, loadImage, Image } from 'canvas';

export const genQrCodeCanvas = async ({ text, width = 100 }) => {
  const canvas = createCanvas(width, width);
  // return QRCode.toDataURL(text, { width: width || 100 });
  return QRCode.toCanvas(canvas, text, { width });
};

export const overlayLogo = async ({ canvas, logoB64Str }) => {
  const ctx = canvas.getContext('2d');
  const { width } = canvas;
  // const logoWidth = width * 0.2;

  const logo = new Image();
  logo.src = 'data:image/png;base64,' + logoB64Str;

  // Draw logo on QR code
  // TODO set logo width
  ctx.drawImage(logo, 0, 0, 70, 70);

  return Promise.resolve(canvas);
};
