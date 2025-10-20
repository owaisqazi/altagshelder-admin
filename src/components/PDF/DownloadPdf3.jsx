/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
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
const DownloadPdf3 = ({ data }) => {
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

        <Text style={[styles.heading, styles.linebreak]}>Beratungsvertrag</Text>
        <Text style={[styles.peragrapgh, { fontSize: "11px" }]}>Zwischen</Text>
        <Text style={[styles.heading2]}>Alltagshelden</Text>
        <Text style={[styles.peragrapgh]}>
          Thomas-Eßer-Straße 86, 53879 Euskirchen, NRW
        </Text>
        <Text style={[styles.peragrapgh2]}>
          Ihr persönlicher Ansprechpartner: Marcin Pozniak
        </Text>
        <Text style={[styles.peragrapgh2]}>Tel:  0178 9749866</Text>
        <Text style={[styles.peragrapgh2]}>
          Mail: <Text style={[styles.email]}> info@alltagshelden-eu.de</Text>
        </Text>
        <Text style={[styles.peragrapgh]}>Und</Text>
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
            {vorname}{" "}
          </Text>
          <Text style={[styles.heading, styles.colors, { width: "100%" }]}>
            {straße}
          </Text>
          <Text style={[styles.heading, styles.colors, { width: "100%" }]}>
            {plz} {ort}
          </Text>
        </View>
        <View style={[{ width: "100%" }]}>
          <Text style={[styles.heading3, { marginTop: "8%" }]}>
            § 1 Vertragsgegenstand
          </Text>
          <Text style={[styles.peragrapgh3, { fontSize: "9px" }]}>
            Der Berater verpflichtet sich, den Kunden allgemein und individuell
            über die rechtlichen Möglichkeiten sowie das Vorgehen im
            Zusammenhang mit Leistungen der Kranken- und Pflegekasse zu
            informieren.
          </Text>
          <Text style={[styles.peragrapgh3, { fontSize: "9px" }]}>
            Dies umfasst:
          </Text>
          <Text
            style={[
              styles.peragrapgh3,
              { paddingLeft: "20px" },
              { fontSize: "9px" },
            ]}
          >
            ⦁&nbsp;&nbsp;&nbsp; eine allgemeine Analyse der aktuellen Situation
            sowie
          </Text>
          <Text
            style={[
              styles.peragrapgh3,
              { paddingLeft: "20px" },
              { fontSize: "9px" },
            ]}
          >
            ⦁&nbsp;&nbsp;&nbsp; die Unterstützung bei der Erstellung und
            Einreichung relevanter Anträge.
          </Text>
          <Text style={[{ display: "flex" }]}>
            <Text
              style={[
                styles.peragrapgh3,
                { fontSize: "11px", fontWeight: "extrabold" },
              ]}
            >
              Hinweis:
            </Text>
            <Text style={[styles.peragrapgh3, { fontSize: "9px" }]}>
              {" "}
              Die Entscheidung über konkrete Maßnahmen obliegt allein dem
              Kunden.
            </Text>
          </Text>
        </View>
        <View style={[{ width: "100%" }]}>
          <Text
            style={[styles.heading3, { marginTop: "7%", paddingBottom: "2%" }]}
          >
            § 2 Haftungsausschluss
          </Text>
          <Text style={[{ display: "flex" }]}>
            <Text>2.1</Text>{" "}
            <Text style={[styles.heading3]}>Kein Erfolgsanspruch</Text>
          </Text>
          <Text style={[{ fontSize: "9px" }]}>
            Der Berater haftet nicht für den Erfolg der Beratung oder für
            Entscheidungen, die der Kunde auf Grundlage der Beratung trifft.
          </Text>
          <Text style={[{ display: "flex", paddingTop: "10px" }]}>
            <Text>2.2</Text>{" "}
            <Text style={[styles.heading3]}>Haftungsbeschränkung</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Die Haftung des Beraters ist auf Vorsatz und grobe Fahrlässigkeit
            beschränkt. Eine Haftung für einfache Fahrlässigkeit wird, soweit
            gesetzlich zulässig, ausgeschlossen.
          </Text>
          <Text style={[{ display: "flex", paddingTop: "10px" }]}>
            <Text>2.3</Text>{" "}
            <Text style={[styles.heading3]}>Haftung für Informationen</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Der Berater übernimmt keine Haftung für die Richtigkeit und
            Vollständigkeit der zur Verfügung gestellten Informationen,
            insbesondere nicht für deren Auswirkungen auf Entscheidungen der
            Kranken- und Pflegekasse.
          </Text>
          <Text style={[{ display: "flex", paddingTop: "10px" }]}>
            <Text>2.4</Text>{" "}
            <Text style={[styles.heading3]}>Erfolgsgarantie</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Der Berater garantiert weder den Erfolg von Anträgen noch von
            Widersprüchen bei der Kranken- oder Pflegekasse.
          </Text>

          <Text
            style={[styles.heading3, { marginTop: "7%", paddingBottom: "2%" }]}
          >
            § 3 Vergütung
          </Text>
          <Text style={[{ display: "flex" }]}>
            <Text>3.1</Text>{" "}
            <Text style={[styles.heading3]}>Erfolgsbasierte Vergütung</Text>
          </Text>
          <Text style={[{ fontSize: "9px" }, styles.linebreak1]}>
            Die Vergütung des Beraters erfolgt ausschließlich auf Erfolgsbasis.
          </Text>
          <Text style={[{ display: "flex" }]}>
            <Text>3.2</Text>{" "}
            <Text style={[styles.heading3, styles.linebreak1]}>
              Erfolgsvergütung in Höhe von 30 %
            </Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Eine Erfolgsvergütung von 30 % wird nur fällig, wenn die Pflegekasse
            dem Kunden die beantragten Gelder bewilligt hat. Die
            Erfolgsvergütung bezieht sich auf alle genehmigten Leistungen,{" "}
            <Text style={[styles.heading3, { fontSize: "9px" }]}>
              mit Ausnahme des Pflegegeldes.
            </Text>
          </Text>
          <Text style={[{ display: "flex", paddingTop: "10px" }]}>
            <Text>3.3</Text>{" "}
            <Text style={[styles.heading3]}>Zahlungsmodalität</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Die Zahlung der Erfolgsvergütung wird erst fällig, wenn die
            bewilligten Gelder von der Pflegekasse beim Kunden eingegangen sind.
            .
          </Text>
          <Text style={[styles.heading3, { fontSize: "9px" }]}>
            Weitere Kosten fallen für den Kunden nicht an.
          </Text>

          <Text
            style={[styles.heading3, { marginTop: "7%", paddingBottom: "2%" }]}
          >
            § 4 Sonstiges
          </Text>
          <Text style={[{ display: "flex" }]}>
            <Text>4.1</Text>{" "}
            <Text style={[styles.heading3]}>Abschluss der Zusammenarbeit</Text>
          </Text>
          <Text style={[{ fontSize: "9px" }]}>
            Dieser Vertrag regelt die Zusammenarbeit zwischen den Parteien
            abschließend. Mündliche Nebenabreden bestehen nicht.
          </Text>
          <Text style={[{ display: "flex",marginTop:"10px"}]}>
            <Text style={styles.linebreaktop}>4.2</Text>{" "}
            <Text style={[styles.heading3]}>Schriftformerfordernis</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Änderungen und Ergänzungen dieses Vertrages bedürfen der
            Schriftform.
          </Text>
          <Text style={[{ display: "flex", paddingTop: "10px" }]}>
            <Text>4.3</Text>{" "}
            <Text style={[styles.heading3]}>Salvatorische Klausel</Text>
          </Text>
          <Text style={[{ padding: "0px" }, { fontSize: "9px" }]}>
            Sollte eine Bestimmung dieses Vertrages unwirksam sein oder werden,
            bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
          </Text>

          <Text
            style={[styles.heading3, { marginTop: "7%", paddingBottom: "2%" }]}
          >
            § 5 Schlussbestimmungen
          </Text>
          <Text style={[{ fontSize: "9px" }]}>
            Dieser Vertrag unterliegt dem Recht der Bundesrepublik Deutschland.
            Gerichtsstand ist Köln.
          </Text>

          <Text style={[{ display: "flex", marginTop: "10%" }]}>
            <Text
              style={[
                styles.peragrapgh3,
                styles.colors,
                { width: "16%", fontSize: "15px" },
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
                  objectFit: "contain", // Adjusted to maintain aspect ratio
                }}
              />
              <Text style={styles.heading3}>Unterschrift Alltagshelden</Text>
              <Text style={styles.heading3}>Kunde</Text>
              <Text>Marcin Pozniak</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Image
                src={signature}
                style={{
                  width: "100%",
                  height: "100px",
                  display: "block",
                  margin: "auto",
                  padding: "10px",
                }}
              />
              <Text style={styles.heading3}>Unterschrift</Text>
              <Text
                style={[
                  styles.heading3,
                  { marginTop: 10 }, // Adjusted margin
                ]}
              >
                {vorname}{" "}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default DownloadPdf3;
