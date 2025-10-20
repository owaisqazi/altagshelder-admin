/* eslint-disable react/prop-types */
import {
  Document,
  // Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
// import { flattenCompanyData } from "../../hooks/FlattenData";
const styles = StyleSheet.create({
  page: {
    padding: 20,
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
    fontWeight: "bolder",
    fontSize: "16px",
    marginTop: "30px",
    marginBottom:'10px',
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
  textfontset: {
    marginBottom: "5px",
  }, 
  headingparents: {
    display: "flex",
    flexDirection: "row", // To align the children horizontally
    justifyContent: "space-between",
    alignItems: "center",
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
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    textAlign: "start",
    fontSize: 10,
     backgroundColor:'lightgray'
  },
  tableCell2: {
    flexGrow: 1,
    padding: 5,
    borderBottom: "1px solid black",
    textAlign: "start",
    fontSize: 10,
     backgroundColor:'lightgray'
  },
  tableCellbody: {
    flexGrow: 1,
    padding: 5,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    textAlign: "start",
    fontSize: 10,
  },
  tableCell2body: {
    flexGrow: 1,
    padding: 5,
    borderBottom: "1px solid black",
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
  totalshow:{
    textDecoration: "underline",
    marginLeft:'5px',
  },
  totalshowMain:{
    flexDirection: "row", // To align the children horizontally
     marginTop:'10px'
  }
});
const DepositPdf = ({tableData}) => {
  // const userData = data && flattenCompanyData(data?.user);

  console.log(tableData, "DownloadPdf---->");
  // const { ort, brith_data, signature } = data;
  // const {
  //   insured: Krankenkasse,
  //   first_name,
  //   last_name,
  //   care_insurance_number: Versicherungsnr,
  // } = userData;
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={[styles.headingparents]}>

        <View>
        <Text style={[styles.heading2]}>August 2024</Text>
        <Text style={[styles.textfontset]}>Patient/in : daynaminc </Text>
        <Text style={[styles.textfontset]}>Address : daynaminc </Text>
        <Text style={[styles.textfontset]}>Krankenkasse : daynaminc </Text>
        <Text style={[styles.textfontset]}>Versicherungs Nr. : daynaminc </Text>
        <Text style={[styles.textfontset]}>Pflegegrad : daynaminc </Text>
        <Text style={[styles.textfontset]}>Geburtsdatum : daynaminc </Text>
        </View>

        <View>


        <Text style={[styles.heading2]}>Leistungserbringer</Text>
        <Text style={[styles.textfontset]}>Alltagshelden</Text>
        <Text style={[styles.textfontset]}>Thomas-Eßer-Straße 86 53879 Euskirchen</Text>
        <Text style={[styles.textfontset]}>IK-Nr: 462521936</Text>
        <Text style={[styles.textfontset]}>Email: info@alltagshelden-eu.de</Text>

        </View>

        </View>


        <View style={styles.table}>
          <View style={[styles.tableRow, { marginTop: 10 }]}>
            <Text
              style={[styles.tableCell2, styles.tableHeader, { width: "15%" }]}
            >
              Tag
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Uhrzeit
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "15%" }]}
            >
              Dauer
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "30%" }]}
            >
              Mitarbeiter
            </Text>
            <Text
              style={[styles.tableCell, styles.tableHeader, { width: "25%" }]}
            >
              Bemerkung
            </Text>
          </View>


          {tableData?.length > 0 && 
             tableData.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell2body, { width: "15%" }]}>
                {row?.date}
                </Text>
                <Text
                  style={[
                    styles.tableCellbody,
                    { width: "15%", fontSize: "10px", textAlign: "start" },
                  ]}
                >
                {row?.start} - {row?.end}
                </Text>
                <Text style={[styles.tableCellbody, { width: "15%" }]}>
                  {row?.grand_total} €
                </Text>
                <Text style={[styles.tableCellbody, { width: "30%" }]}>
                  {row?.user?.full_name}
                </Text>
                <Text style={[styles.tableCellbody, { width: "25%" }]}>
                  
                </Text>
              </View>
             ))}
        </View>

<View style={[styles.headingparents]}>

  <View></View>

  <View style={[styles.totalshowMain]}>
  <Text style={[styles.textfontset]}>Gesamtstunden : </Text>
<Text style={[styles.totalshow]}>1000</Text>
  </View>
</View>


      </Page>

    </Document>
  );
};
export default DepositPdf;
