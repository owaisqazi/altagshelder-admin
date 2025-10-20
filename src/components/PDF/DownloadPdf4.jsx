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
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  heading: {
    textAlign: "center",
    fontWeight: "extrabold",
    fontSize: "11px",
    color: "black",
  },
  colors: {
    backgroundColor: "white",
  },
  peragrapgh: {
    textAlign: "center",
    fontSize: "9px",
  },
  bolds:{
    fontWeight:"!900"
  },
  peragrapgh2: {
    textAlign: "center",
    fontSize: "9px",
  },
  heading2: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: "11px",
    marginTop: "20px",
    color: "black",
  },
  email: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: "11px",
    color: "#4585F4",
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
    fontWeight: "700",
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
    alignItems: "center",
  },
  flex2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Optional: Align items vertically centered
  },
  Align1: {
    marginLeft: "100px",
  },
  linebreak: {
    paddingBottom: "20px",
  },
  linebreak1: {
    paddingBottom: "10px",
  },
  linebreaktop: {
    paddingtop: "10px",
  },
  linebreaktop1: {
   margintop: "50px",
  },
});
const DownloadPdf4 = ({ data }) => {
  console.log(data, "DownloadPdf3");
  const { vorname, straße, plz, ort, brith_data, signature } = data;

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

        <Text style={[styles.heading, styles.linebreak]}>Haushaltshilfe Betreuungsvertrag</Text>
        <Text style={[styles.peragrapgh,{fontSize:"11px"}]}>Zwischen</Text>
        <Text style={[styles.heading2,{fontSize:"11px"}]}>Alltagshelden</Text>
        <Text style={[styles.peragrapgh,{fontSize:"9px"}]}>
          homas-Eßer-Straße 86, 53879 Euskirchen, NRW
        </Text>
        <Text style={[styles.peragrapgh2,{fontSize:"9px"}]}>Tel:  0178 9749866</Text>
        <Text style={[styles.peragrapgh2,{fontSize:"9px"}]}>
          Mail: <Text style={[styles.email,{fontSize:"9px"}]}> info@alltagshelden-eu.de</Text>
        </Text>
        <Text style={[styles.peragrapgh,{fontSize:"9px"}]}>Und</Text>
        <View
          style={[{ paddingLeft: "35%", paddingRight: "35%", width: "100%" }]}
        >
          <Text
            style={[
              styles.peragrapgh3,
              styles.heading,
              styles.colors,
              { width: "100%" },
            ]}
          >
            {vorname}
          </Text>
          <Text style={[styles.heading, styles.colors, { width: "100%" }]}>
            {straße}
          </Text>
          <Text style={[styles.heading, styles.colors, { width: "100%" }]}>
            {plz} {ort}
          </Text>
        </View>
        <View style={[{ width: "100%" }]}>
          <Text style={[styles.heading3,styles.bolds, { marginTop: "8%" }]}>
            Unsere Philosophie und Dienstleistungen
          </Text>
          <Text style={[styles.peragrapgh3,{fontSize:"9px"}]}>
            Herzlich willkommen bei{" "}
            <Text style={[styles.bolds,{fontSize:"11px"}]}>Alltagshelden!</Text> Wir bieten
            Ihnen engagierte und qualifizierte Mitarbeiter, die speziell
            geschult sind, um Ihre individuellen Bedürfnisse bestmöglich zu
            erfüllen. Unser Ziel ist es, Ihnen durch unsere Dienstleistungen
            mehr Lebensqualität und Entlastung zu bieten.
          </Text>
          <Text style={[styles.peragrapgh3, { paddingBottom: "20px" }]}>
            Unsere Dienstleistungen umfassen:
          </Text>
          <Text style={[styles.heading3, { paddingLeft: "20px" },styles.bolds]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Hauswirtschaftliche
            Unterstützung
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Unterstützung bei der
            Zubereitung von Mahlzeiten
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Einkauf von Waren des
            täglichen Lebens
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Wäschepflege: Waschen,
            Trocknen, Bügeln und Verstauen
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Reinigung der Wohnräume
          </Text>

          <Text
            style={[
              styles.heading3,
              { paddingLeft: "20px", paddingTop: "10px" },styles.bolds
            ]}
          >
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Alltagsbegleitung
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Unterstützung bei Gesprächen
            und Telefonaten
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Begleitung zu Veranstaltungen
            und sozialen Aktivitäten
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Gemeinsame Freizeitgestaltung
            und Teilnahme an kulturellen Ereignissen
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Hilfe bei
            Behördenangelegenheiten und Organisation von Hilfen
          </Text>

          <Text
            style={[
              styles.heading3,
              { paddingLeft: "20px", paddingTop: "10px" },
            ]}
          >
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Pflegebegleitung
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Beratung über
            Pflegehilfsmittel und finanzielle Unterstützungsmöglichkeiten
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Unterstützung bei der
            Inanspruchnahme weiterer Hilfsangebote
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Emotionale Begleitung und
            Stressbewältigung
          </Text>
          <Text
            style={[
              styles.peragrapgh3,
              { fontSize: "11px", fontWeight: "extrabold" },
            ]}
          >
            Vertragsbeginn und Laufzeit
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "20px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Emotionale Begleitung und
            Stressbewältigung
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "20px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Beide Parteien können den
            Vertrag mit einer Frist von 4 Wochen zum Monatsende kündigen.
          </Text>
          <Text
            style={[
              styles.peragrapgh3,
              { fontSize: "11px", fontWeight: "extrabold" },
            ]}
          >
            Besondere Kündigungsgründe
          </Text>
          <Text style={[styles.peragrapgh3, { paddingLeft: "20px" },{fontSize:"9px"}]}>
            <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text> Der Vertrag kann sofort
            gekündigt werden, wenn z. B. das Vertrauen zerstört ist, sich Ihre
            Pflegesituation ändert oder es zu Zahlungsschwierigkeiten kommt.
          </Text>
          <Text
            style={[
              styles.peragrapgh3,
              { fontSize: "11px", fontWeight: "extrabold" },styles.linebreak1
            ]}
          >
            Unsere Leistungen und Ihre Verantwortung
          </Text>
        </View>
        <Text style={styles.flex2}>
          <Text style={[styles.heading3,styles.bolds]}>
            ⦁&nbsp;&nbsp;&nbsp;&nbsp;Unsere Leistungen:
          </Text>
          <Text style={{fontSize:"9px"}}>
            Wir stellen engagierte und qualifizierte Mitarbeiter bereit.
            Zusätzlich klären und verwalten wir Ihre möglichen Leistungen bei
            der Pflegekasse, um sicherzustellen, dass Sie möglichst keine
            privaten Kosten tragen müssen.
          </Text>
        </Text>
        <Text style={styles.flex2}>
          <Text style={[styles.heading3,styles.bolds]}>
            ⦁&nbsp;&nbsp;&nbsp;&nbsp;Ihre Verantwortung:
          </Text>
          <Text style={{fontSize:"9px"}}>
            Reinigungsmittel und andere Verbrauchsmaterialien müssen von Ihnen
            bereitgestellt werden.
          </Text>
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },
          ]}
        >
          Buchung und Mindeststunden
        </Text>
        <Text style={styles.flex2}>
          <Text style={[styles.heading3,styles.bolds]}>
            ⦁&nbsp;&nbsp;&nbsp;&nbsp;3 Stunden pro Monat:
          </Text>
          <Text>
            Diese Stunden werden am Stück erbracht. Eine Aufteilung ist nicht
            möglich.
          </Text>
        </Text>
        <Text style={styles.flex2}>
          <Text style={[styles.heading3,styles.bolds]}>
            ⦁&nbsp;&nbsp;&nbsp;&nbsp;Mehr als 3 Stunden pro Monat:
          </Text>
          <Text style={{fontSize:"9px"}}>
            Pro Termin müssen mindestens 2 Stunden am Stück gebucht werden.
          </Text>
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },styles.bolds
          ]}
        >
          Abrechnung der Leistungen
        </Text>
        <Text style={{fontSize:"9px"}}>
          Wir klären die Möglichkeit der Abrechnung über Ihre Pflegekasse. Wenn
          dies möglich ist, werden die Kosten direkt von der Pflegekasse
          übernommen. Sollte eine Übernahme nicht erfolgen, informieren wir Sie
          umgehend.
        </Text>
        <Text style={{fontSize:"9px"}}>
          Der Stundensatz beträgt dann 36 €. Es gibt keine versteckten Kosten
          oder juristischen Fallstricke; alle Kosten sind transparent.
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },
            styles.bolds
          ]}
        >
          Zeiterfassung und Dokumentation
        </Text>
        <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
          <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text>Die Abrechnung erfolgt in
          15-Minuten-Blöcken. Nach jeder erbrachten Dienstleistung werden die
          geleisteten Stunden erfasst und von beiden Parteien unterschrieben.
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },
            styles.bolds
          ]}
        >
          Anfahrt
        </Text>
        <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
          <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text>Für jeden Termin berechnen wir
          eine Anfahrtspauschale von 6 €.
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },
            styles.bolds
          ]}
        >
          Weitere Kosten
        </Text>
        <Text style={styles.flex2}>
          <Text style={[styles.heading3,styles.bolds]}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⦁&nbsp;&nbsp;&nbsp;&nbsp;Fahrdienst:
          </Text>
          <Text style={{fontSize:"9px"}}>
            Die ersten 10 Kilometer sind kostenlos. Danach berechnen wir 20 €
            für maximal 50 Kilometer. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Längere Strecken werden individuell
            besprochen und vorab geklärt.
          </Text>
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },styles.bolds
          ]}
        >
          Absage von Terminen
        </Text>
        <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
          <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text>Wenn Sie einen Termin nicht
          mindestens 24 Stunden vorher absagen, müssen Sie die volle vereinbarte
          Zeit bezahlen.
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },styles.bolds
          ]}
        >
          Datenschutz
        </Text>
        <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },styles.bolds]}>
          <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text>Wir behandeln Ihre persönlichen
          Daten vertraulich und verwenden sie ausschließlich für die Erbringung
          unserer Dienstleistungen.
        </Text>
        <Text
          style={[
            styles.peragrapgh3,
            { fontSize: "11px", fontWeight: "extrabold" },
            styles.bolds
          ]}
        >
          Haftung
        </Text>
        <Text style={[styles.peragrapgh3, { paddingLeft: "40px" },{fontSize:"9px"}]}>
          <Text>⦁&nbsp;&nbsp;&nbsp;&nbsp;</Text>Wir haften nur für Schäden, die
          durch grobe Fahrlässigkeit oder Vorsatz unsererseits verursacht
          werden.
        </Text>
        <View style={[{ width: "100%" }]}>
          <Text style={[{ display: "flex", marginTop: "10%" }]}>
            <Text
              style={[
                styles.peragrapgh3,
                styles.colors,
                { width: "16%", fontSize: "11px" },
              ]}
            >
              Ort, Datum:
            </Text>{" "}
            <Text
              style={[
                { width: "16%", fontSize: "11px", textDecoration: "underline" },
              ]}
            >
              {ort}, {brith_data}
            </Text>
          </Text>
          <View style={styles.flex1}>
            <View>
              <Image
                src={"/signature_client.png"}
                style={{
                  width: "100%",
                  height: "100px",
                  display: "block",
                  margin: "auto",
                  padding: "10px",
                  objectFit:"contain"
                }}
              />
              <Text style={styles.heading3}>Unterschrift Alltagshelden</Text>
              <Text>Marcin Pozniak</Text>
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
              <Text style={styles.heading3}>Unterschrift Kunde</Text>
              <Text style={[styles.heading3]}>
                {vorname}
                </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default DownloadPdf4;
