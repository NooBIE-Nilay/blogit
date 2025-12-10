import { getFromLocalStorage } from "utils/storage";

export const subscribeToDocumentDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const documentDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "DocumentDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return documentDownloadSubscription;
};
