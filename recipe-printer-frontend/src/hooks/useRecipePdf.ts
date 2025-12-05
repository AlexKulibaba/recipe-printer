import { useState, type RefObject } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const useRecipePdf = (
  printRef: RefObject<HTMLDivElement | null>,
  title: string
) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGenerating(true);
    try {
      const element = printRef.current;
      const clone = element.cloneNode(true) as HTMLElement;

      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-9999px";
      container.style.left = "-9999px";
      container.style.width = "1000px";
      container.appendChild(clone);
      document.body.appendChild(container);

      clone.style.width = "100%";
      clone.style.margin = "0";
      clone.style.maxWidth = "none";
      clone.style.boxShadow = "none";

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1000,
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { handleDownloadPDF, isGenerating };
};
