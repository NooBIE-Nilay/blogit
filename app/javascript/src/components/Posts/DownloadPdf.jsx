import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle, Toastr } from "components/commons";
import { useParams } from "react-router-dom";

const DownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { slug } = useParams();
  const generatePdf = async () => {
    try {
      await postsApi.generatePdf({ slug });
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading document...");
      const { data } = await postsApi.download({ slug });
      saveAs({ blob: data, fileName: "blogit_document.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  const message = isLoading
    ? "Document is being generated..."
    : "Document downloaded!";

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Download document" />
        <h1>{message}</h1>
      </div>
    </Container>
  );
};

export default DownloadPdf;
