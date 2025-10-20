/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import moment from "moment/moment";
import { flattenCompanyData } from "../../hooks/FlattenData";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 9,
    color: "gray",
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  companyInfo: {
    marginBottom: 20,
    textAlign: "center",
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flexGrow: 1,
    padding: 5,
    border: "1px solid black",
    textAlign: "start",
    fontSize: 10,
  },
  tableHeader: {
    fontWeight: "bold",
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    marginRight: 40,
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "center",
  },
  underline: {
    borderBottom: "ipx solid #000",
  },
});
const DownloadPdf2 = ({ invoiceData: data }) => {
  const invoiceData = data.invoice;
  console.log(invoiceData, "DownloadPdf2");
  const userData = data && flattenCompanyData(data?.user);
  const {
    customer_number: Kundennummer,
    insured: Krankenkasse,
    first_name,
    last_name,
    care_insurance_number: Versicherungsnr,
    date_of_birth: Geburtsdatum,
    care_level: Pflegegrad,
  } = userData;

  // Combine first_name and last_name
  const klient = `${first_name} ${last_name}`;
  const netAmount = invoiceData.reduce(
    (total, row) => total + row?.qty * row?.product?.price,
    0
  );
  const gstRate = invoiceData?.[invoiceData.length - 1]?.gst || 0; // GST rate in percentage
  const gstAmount = gstRate;
  const totalAmount = (netAmount + gstAmount) / 100;
  const serialNumber = invoiceData?.[invoiceData.length - 1]?.serial?.serial_no;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.tableRow, { alignItems: "start" }]}>
          <Text
            style={[
              {
                textAlign: "start",
                fontSize: "9px",
                color: "#000",
                width: "50%",
                marginTop: "auto",
                borderBottom: "1px solid #000",
              },
            ]}
          >
            Alltagshelden - Thomas-Eßer-Straße 86 - 53879 Euskirchen
          </Text>
          <Image
            style={{ width: "45%", marginLeft: "auto" }}
            src={"/pdflogo.png"}
          />
        </View>

        <View
          style={[styles.tableRow, { alignItems: "center", marginTop: "20px" }]}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                textAlign: "start",
                color: "#000",
                fontSize: "12px",
                paddingTop: "3px",
              }}
            >
              Krankenkasse
            </Text>
            <Text
              style={{
                textAlign: "start",
                color: "#000",
                fontSize: "12px",
                paddingTop: "3px",
              }}
            >
              KV Straße
            </Text>
            <Text
              style={{
                textAlign: "start",
                color: "#000",
                fontSize: "12px",
                paddingTop: "3px",
              }}
            >
              KV Plz und Ort
            </Text>
          </View>

          <View style={{ width: "45%", marginLeft: "auto" }}>
            <View>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                Alltagshelden
              </Text>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                Thomas-Eßer-Straße 86
              </Text>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                53879 Euskirchen
              </Text>
            </View>
            <View style={{ paddingTop: "20px" }}>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                IK-Nummer: 590524150
              </Text>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                Tel.: 0157 55837628
              </Text>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                E-Mail: info@alltagshelden-eu.de
              </Text>
              <Text
                style={{
                  textAlign: "start",
                  color: "#000",
                  fontSize: "12px",
                  paddingTop: "3px",
                }}
              >
                Webseite: Alltagshelden-eu.de
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={[
            styles.invoiceTitle,
            { textAlign: "start", fontWeight: "800" },
          ]}
        >
          Rechnung
        </Text>

        <View style={styles.tableRow}>
          <View style={{ width: "30%" }}>
            <Text style={{ fontSize: "12px" }}>
              Rechnung Nr. {serialNumber}
            </Text>
            <Text style={{ fontSize: "8px", textAlign: "center" }}>
              (bitte bei Zahlung angeben!)
            </Text>
          </View>
          <View style={{ width: "45%", marginLeft: "auto" }}>
            <Text style={{ fontSize: "12px" }}>
              Ausstellungsdatum:{" "}
              {moment(invoiceData?.[invoiceData.length - 1]?.created_at).format(
                `DD.MM.yyyy`
              )}
            </Text>
          </View>
        </View>

        <View style={[styles.tableRow, { paddingTop: "30px" }]}>
          <View style={{ width: "45%" }}>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Kundennummer:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {Kundennummer}
              </Text>
            </View>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Klient:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>{klient}</Text>
            </View>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Geburtsdatum:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {Geburtsdatum}
              </Text>
            </View>
          </View>
          <View style={{ width: "45%", marginLeft: "auto" }}>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Krankenkasse:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {Krankenkasse}
              </Text>
            </View>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Versicherungsnr:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {Versicherungsnr}
              </Text>
            </View>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Pflegegrad:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {Pflegegrad}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.tableRow,
            { paddingTop: "20px", borderBottom: "1px solid #000" },
          ]}
        >
          <View style={{ width: "45%" }}>
            <View style={[styles.tableRow, { paddingTop: "3px" }]}>
              <Text style={{ width: "50%" }}>Leistungszeitpunkt:</Text>
              <Text style={{ width: "50%", textAlign: "end" }}>
                {" "}
                {data?.person_need_care}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, { marginTop: 20 }]}>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Pos
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "40%" }]}
            >
              Leistung
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Einzelpreis
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Anzahl
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Gesamtpreis
            </Text>
          </View>
          {invoiceData?.length > 0 &&
            invoiceData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: "15%" }]}>
                  {index + 1}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "40%", fontSize: "10px", textAlign: "start" },
                  ]}
                >
                  {row?.product?.name}
                </Text>
                <Text style={[styles.tableCell, { width: "15%" }]}>
                  {row?.product?.price} €
                </Text>
                <Text style={[styles.tableCell, { width: "15%" }]}>
                  {" "}
                  {row?.qty}
                </Text>
                <Text style={[styles.tableCell, { width: "15%" }]}>
                  {row?.qty * row?.product?.price} €
                </Text>
              </View>
            ))}
        </View>

        <View
          style={[
            styles.tableRow,
            { marginTop: "30px", borderTop: "1px solid #000" },
          ]}
        >
          <View style={{ width: "55%" }}>
            <Text style={{ fontSize: "11px", paddingTop: "4px" }}>
              Der Gesamtbetrag ist ab Erhalt dieser Rechnung zahlbar
            </Text>
          </View>
          <View
            style={{
              width: "35%",
              marginLeft: "auto",
              border: "1px solid #000",
            }}
          >
            {/* Nettobetrag */}
            <View
              style={[
                styles.tableRow,
                {
                  paddingTop: "3px",
                  borderBottom: "1px solid #000",
                  padding: "4px",
                },
              ]}
            >
              <Text style={{ width: "55%" }}>Nettobetrag:</Text>
              <Text
                style={{
                  width: "45%",
                  textAlign: "end",
                  marginLeft: "auto",
                }}
              >
                {netAmount.toFixed(2)} €
              </Text>
            </View>

            <View
              style={[
                styles.tableRow,
                {
                  paddingTop: "3px",
                  borderBottom: "1px solid #000",
                  padding: "4px",
                },
              ]}
            >
              <Text style={{ width: "55%" }}>*zzgl. 0 % MwSt:</Text>
              <Text
                style={{ width: "45%", textAlign: "end", marginLeft: "auto" }}
              >
                {gstAmount} %{" "}
              </Text>
            </View>

            {/* Gesamtbetrag */}
            <View
              style={[
                styles.tableRow,
                {
                  paddingTop: "3px",
                  borderBottom: "1px solid #000",
                  padding: "4px",
                },
              ]}
            >
              <Text style={{ width: "55%" }}>Gesamtbetrag:</Text>
              <Text
                style={{ width: "45%", textAlign: "end", marginLeft: "auto" }}
              >
                {totalAmount.toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ paddingTop: "10px" }}>
          *Die abgerechneten Leistungen sind gemäß §4 Nr. 16.g UStG
          umsatzsteuerbefreit.
        </Text>
        <View
          style={[
            styles.tableRow,
            {
              marginTop: "20px",
              borderTop: "1px solid #000",
              paddingTop: "5px",
            },
          ]}
        >
          <View style={{ width: "20%" }}>
            <Text style={{ fontSize: "9px" }}>Alltagshelden</Text>
            <Text style={{ fontSize: "9px" }}>GF. Maric Poniak</Text>
            <Text style={{ fontSize: "9px" }}>Thomas-Eßer-Straße 86</Text>
            <Text style={{ fontSize: "9px" }}>53879 Euskirchen</Text>
          </View>
          <View style={{ width: "30%", paddingLeft: "5px" }}>
            <Text style={{ fontSize: "9px" }}>Tel.: 0157 55837628</Text>
            <Text style={{ fontSize: "9px" }}>
              E-Mail: info@alltagshelden-eu.de
            </Text>
            <Text style={{ fontSize: "9px" }}>
              Webseite: Alltagshelden-eu.de
            </Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text style={{ fontSize: "9px" }}>N26</Text>
            <Text style={{ fontSize: "9px" }}>
              IBAN: DE53 1001 1001 2628 4841 02
            </Text>
            <Text style={{ fontSize: "9px" }}>BIC: NTSBDED1XXX</Text>
          </View>
          <View style={{ width: "17%", paddingLeft: "3px" }}>
            <Text style={{ fontSize: "9px" }}>Finanzamt</Text>
            <Text style={{ fontSize: "9px" }}>Ust.it: DE329049402</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadPdf2;
