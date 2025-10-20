/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { flattenCompanyData } from "../../hooks/FlattenData";
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  heading: {
    textAlign: "center",
    fontWeight: "extrabold",
    textDecoration: "underline",
    fontSize: "11px",
    color: "black",
  },
  colors: {
    backgroundColor: "white",
  },
  peragrapgh: {
    textAlign: "start",
  },
  peragrapgh2: {
    textAlign: "start",
  },
  heading2: {
    textAlign: "start",
    fontWeight: "900",
    textDecoration: "underline",
    fontSize: "11px",
    marginTop: "30px",
    color: "black",
  },
  email: {
    textAlign: "start",
    fontWeight: "900",
    fontSize: "11px",
    color: "#4585F4",
    textDecoration: "underline",
  },
  peragrapgh3: {
    marginTop: "10px",
  },
  heading3: {
    textAlign: "start",
    fontWeight: "extrabold",
    fontSize: "11px",
    color: "black",
  },
  peragrapgh4: {
    textAlign: "start",
    fontWeight: "900",
    fontSize: "11px",
    color: "black",
  },
  size: {
    width: "200px",
  },
  size1: {
    width: "50%",
  },
  flex1: {
    display: "flex",
    flexDirection: "row", // To align the children horizontally
    justifyContent: "space-between",
    alignItems: "start",
  },
  Align1: {
    marginLeft: "100px",
  },
  fixedsize: {
    fontSize: "9px",
  },
});
const DownloadPdf5 = ({ data }) => {
  const userData = data && flattenCompanyData(data?.user);

  console.log(data, "DownloadPdf");
  const { ort, brith_data, signature } = data;
  const {
    insured: Krankenkasse,
    first_name,
    last_name,
    care_insurance_number: Versicherungsnr,
  } = userData;
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {/* <View style={{ paddingBottom: 20 }}>
          <Image
            src={"/pdflogo.png"}
            style={{
              width: "34%",
              height: "45px",
              display: "block",
              marginLeft: "auto",
            }}
          />
        </View> */}

        <Text style={[styles.heading]}>Vollmacht und Datenschutzerklärung</Text>
        <Text style={[styles.heading2]}>Abtretender</Text>
        <View style={[{ paddingRight: "70%", width: "100%" }]}>
          <Text style={[styles.colors, { width: "49%" }, styles.fixedsize]}>
            Krankenkasse:&nbsp;{Krankenkasse}
          </Text>
          <Text
            style={[
              styles.colors,
              { width: "71%", marginRight: "20px" },
              styles.fixedsize,
            ]}
          >
            Versichertennummer:&nbsp;{Versicherungsnr}
          </Text>
          <Text
            style={[
              styles.colors,
              { width: "76%", marginRight: "33px" },
              styles.fixedsize,
            ]}
          >
            Vorname & Nachname:&nbsp;{first_name} {last_name}
          </Text>
          <Text
            style={[
              styles.colors,
              { width: "50%", marginRight: "33px" },
              styles.fixedsize,
            ]}
          >
            Geburtsdatum:&nbsp;{brith_data}
          </Text>
        </View>
        <View style={[{ width: "100%" }]}>
          <Text
            style={[styles.heading, { marginTop: "4%", textAlign: "left" }]}
          >
            Abtretungsempfänger:
          </Text>
          <Text style={styles.fixedsize}>Alltagshelden</Text>
          <Text style={styles.fixedsize}>Marcin Pozniak</Text>
          <Text style={styles.fixedsize}>Thomas-Eßer-Straße 86</Text>
          <Text style={styles.fixedsize}>53879 Euskirchen, NRW</Text>
          <Text style={styles.fixedsize}>Tel: 0178 9749866</Text>
          <Text style={[styles.email, styles.fixedsize]}>
            info@alltagshelden-eu.de
          </Text>
        </View>
        <View style={[{ width: "100%" }]}>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>I.</Text> <Text style={[styles.heading3]}> Vollmacht</Text>
          </Text>
          <Text style={styles.fixedsize}>
            Ich bevollmächtige die Alltagshelden, in meinem Namen alle nötigen
            Schritte für die Bereitstellung und Durchführung von Haushaltshilfe,
            Entlastungsleistungen, Verhinderungspflege und Pflegeberatung gemäß
            §§ 24h, 38 SGB V sowie §§ 37 Abs. 3, 39, 45a, 45b SGB XI bei meiner
            Krankenkasse/Pflegekasse vorzunehmen.
          </Text>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>III.</Text>{" "}
            <Text style={[styles.heading3]}> Abtretungserklärung</Text>
          </Text>
          <Text style={styles.fixedsize}>
            Ich informiere meine Krankenkasse/Pflegekasse darüber, dass ich
            meine Ansprüche auf Zahlung und Erstattung an die Alltagshelden
            übertrage. Dies gilt nur für die Haushaltshilfe-Leistungen, die die
            Alltagshelden erbracht haben und die ich durch einen
            Leistungsnachweis bestätigt habe. Die Alltagshelden dürfen direkt
            mit der Krankenkasse/Pflegekasse abrechnen.
          </Text>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>IV.</Text> <Text style={[styles.heading3]}> Datenschutz</Text>
          </Text>
          <Text style={styles.fixedsize}>
            Ich stimme zu, dass die Alltagshelden meine personenbezogenen Daten,
            einschließlich Gesundheitsdaten, gemäß den geltenden
            Datenschutzbestimmungen speichern, verarbeiten und an Dritte
            weitergeben dürfen, wenn dies zur Erfüllung der Leistungen oder für
            andere genehmigte Zwecke nötig ist.
          </Text>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>V.</Text>{" "}
            <Text style={[styles.heading3]}>
              {" "}
              Widerrufbarkeit und Gültigkeitsdauer
            </Text>
          </Text>
          <Text style={styles.fixedsize}>
            Ich kann diese Erklärungen jederzeit schriftlich widerrufen. Diese
            Erklärung gilt ab dem Datum der Unterzeichnung und bleibt bis zum
            Widerruf wirksam.
          </Text>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>VI.</Text>{" "}
            <Text style={[styles.heading3]}> Haftungsausschluss</Text>
          </Text>
          <Text style={styles.fixedsize}>
            Die Alltagshelden haften nur für Vorsatz und grobe Fahrlässigkeit.
          </Text>
          <Text style={[{ display: "flex", marginTop: "4%" }]}>
            <Text>VII.</Text>{" "}
            <Text style={[styles.heading3]}> Kenntnisnahme</Text>
          </Text>
          <Text style={styles.fixedsize}>
            Ich bestätige, dass ich alle Punkte dieser Erklärung verstanden habe
            und ausreichend informiert wurde.
          </Text>
          <Text style={[{ display: "flex", marginTop: "10%" }]}></Text>
          <View style={styles.flex1}>
            <View>
              <Text style={[{ display: "flex" }]}>
                <Text
                  style={[
                    styles.peragrapgh3,
                    styles.colors,
                    { width: "30%", fontSize: "11px" },
                  ]}
                >
                  Ort, Datum:
                </Text>{" "}
                <Text
                  style={[
                    {
                      width: "16%",
                      fontSize: "11px",
                      textDecoration: "underline",
                    },
                  ]}
                >
                  {ort}, {brith_data}
                </Text>
              </Text>
            </View>
            <View>
              <Image
                src={signature}
                style={{
                  width: "100%",
                  height: "100px",
                  display: "block",
                  margin: "auto",
                  padding: "10px",
                  objectFit:"contain"
                }}
              />
              <Text
                style={[
                  styles.heading3,
                  styles.colors, // Changed marginTop to a number
                ]}
              >
                Unterschrift
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default DownloadPdf5;
