import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

export interface QRCodeGenerateOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

export const generateQRCode = async (
  data: string,
  options: QRCodeGenerateOptions = {}
): Promise<string> => {
  const {
    width = 500,
    margin = 10,
    color = { dark: '#000000', light: '#FFFFFF' },
    errorCorrectionLevel = 'H',
  } = options;

  return QRCode.toDataURL(data, {
    width,
    margin,
    color,
    errorCorrectionLevel,
  });
};

export const generateQRCodeSVG = async (
  data: string,
  options: QRCodeGenerateOptions = {}
): Promise<string> => {
  const { errorCorrectionLevel = 'H' } = options;

  return QRCode.toString(data, { type: 'image/svg+xml', errorCorrectionLevel });
};

export const generateUniqueQRCode = (): string => {
  return uuidv4();
};
