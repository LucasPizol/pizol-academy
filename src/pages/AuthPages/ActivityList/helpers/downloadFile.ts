import { PrivateAPI } from "../../../../api/PrivateAPI";

export abstract class DownloadFile {
  static async downloadOnce(pdf_file_url: string) {
    const { data } = await PrivateAPI.blobPost("/download", { pdf_file_url });

    console.log(data);

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", pdf_file_url + ".pdf");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return data;
  }

  static async downloadMany(files_url: string[]) {
    const body = {
      pdfs: files_url,
    };

    const { data } = await PrivateAPI.blobPost("/download/many", body);

    const url = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "files.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return data;
  }
}
