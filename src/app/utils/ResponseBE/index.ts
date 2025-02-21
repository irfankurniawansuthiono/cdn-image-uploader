export default function ResponseBE(
  success: boolean,
  message: string,
  data: any | null = null
) {
  return { success, message, data };
}
