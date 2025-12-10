import { getFromLocalStorage } from "utils/storage";

export const subscribeToDocumentDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generateDocument,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const documentDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "DocumentDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Link connected...");
        generateDocument();
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
