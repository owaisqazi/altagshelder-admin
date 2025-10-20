import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react'
import DownloadPdf2 from './DownloadPdf2';

const PDF2 = () => {
  return (
    <PDFDownloadLink document={<DownloadPdf2  />} fileName="somename.pdf">
    {({ blob, url, loading, error }) =>
      loading ? (
        "Loading document..."
      ) : (
        <>
          <a href={url} download="somename.pdf">
            Download now!
          </a>
          <iframe
            src={url}
            frameborder="1"
            style={{ width: "100%", height: "100vh" }}
          ></iframe>
        </>
      )
    }
  </PDFDownloadLink>
  )
}

export default PDF2