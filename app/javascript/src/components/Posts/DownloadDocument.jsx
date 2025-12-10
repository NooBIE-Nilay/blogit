import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToDocumentDownloadChannel } from "channels/documentDownloadChannel";
import { ProgressBar } from "components/commons";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { Download } from "neetoIcons";
import { Button, Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const DownloadDocument = ({ slug }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { Header, Body } = Modal;

  const consumer = createConsumer();

  const { t } = useTranslation();

  const generateDocument = async () => {
    try {
      await postsApi.generateDocument({ slug });
    } catch (error) {
      Logger.error(error);
      setIsOpen(false);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download({ slug });
      FileSaver.saveAs(data, `blogit_${slug}.pdf`);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      subscribeToDocumentDownloadChannel({
        consumer,
        setMessage,
        setProgress,
        generateDocument,
      });
    }

    return () => {
      consumer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
    }
  }, [progress]);

  return (
    <>
      <Button
        icon={() => <Download />}
        style="text"
        tooltipProps={{ content: t("post.download") }}
        onClick={() => setIsOpen(true)}
      />
      <Modal {...{ isOpen }} onClose={setIsOpen}>
        <Header>
          <Typography className="font-bold" style="h2">
            {t("common.download")}
          </Typography>
        </Header>
        <Body>
          <ProgressBar {...{ progress }} />
          <Typography>{message}</Typography>
        </Body>
      </Modal>
    </>
  );
};

export default DownloadDocument;
