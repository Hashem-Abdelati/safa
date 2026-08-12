export const contactEmail = "abdelati.hashem@gmail.com";
export const contactPhone = "+962798509111";
export const contactPhoneDisplay = "+962 7 9850 9111";
export const whatsappPhone = "12023558027";

export function whatsappHref(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}
