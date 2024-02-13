import { PrivateAPI } from "../../../../api/PrivateAPI";

export abstract class DownloadFile {
  static async downloadOnce(pdf_file_url: string) {
    const { data } = await PrivateAPI.blobPost("/download", { pdf_file_url });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", pdf_file_url + ".pdf");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return data;
  }

  static async downloadImage(sendActivityId: number) {
    const { data, error } = await PrivateAPI.blobPost(
      "/sendActivity/download/",
      {
        sendActivityId,
      }
    );

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", sendActivityId + ".zip");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(error);

    return data;
  }
}
