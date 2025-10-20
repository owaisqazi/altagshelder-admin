/* eslint-disable react/prop-types */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  G,
  Path,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 0,
  },
  label: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  input: {
    marginTop: 10,
    marginBottom: 3,
    fontSize: 10,
    borderBottom: "1px solid #000",
  },
  borderBottomInput: {
    borderBottom: "1px solid black", // Full-width underline
    marginBottom: 10, // Adds some spacing between lines
    paddingBottom: 5, // Padding between text and border
    fontSize: 12, // Adjust font size as needed
  },
  inputArea: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    marginTop: 10,
    marginBottom: 3,
    fontSize: 10,
    // borderBottom: "1px solid #000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  multiLineInput: {
    border: "1px solid black",
    height: 60,
    marginTop: 5,
    marginBottom: 10,
  },
  hint: {
    color: "red",
    fontSize: 9,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: "1px solid black",
    marginRight: 5,
    marginTop: 5,
    position: "relative",
  },
  checkMark: {
    stroke: "black",
    strokeWidth: 2,
  },
  inputLine: {
    borderBottom: "1px solid black",
    flexGrow: 1,
    marginHorizontal: 5,
    height: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  formLabel: {
    fontSize: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  horizontalLine: {
    borderBottom: "1px solid black",
    flexGrow: 1,
    height: 12,
  },
});

const DownloadPdf = ({ data }) => {
  const {
    nursing_insurance_number,
    name,
    vorname,
    brith_data,
    straße,
    plz,
    ort,
    person_need_care,
    period,
    clock_until,
    care_support_situation,
    counsellors_point_of_view,
    consultants_assessment,
    because,
    no_no_measures_are_suggested,
    yes_the_following_measures_are_suggested,
    care_course_training,
    combination_benefit,
    substitute_care,
    rehabilitation_services,
    day_night_care,
    offers_to_support_everyday_life,
    care_aids_technical_aids,
    reassessment_of_care,
    care_benefits_in_kind,
    short_term_care,
    home_adaptation,
    leisure_options_care_time_family_care_time,
    further_measures_and_explanations_of_the_above_measures,
    further_measures_and_explanations_of_the_above_measures_detail,
    counselors_point_of_view,
    information,
    agree_to_the_transmission_of_the_information_3,
    agree_to_the_transmission_of_the_information_4,
    further_care_advice_according_to_7a_SGB,
    my_nursing_care_fund_or_my_private_insurance_company,
    nursing_care_advice_in_accordance_with_Section_7aSGB,
    place_date,
    the_assessments_made_for_the_person_in_need_of_care,
    copy_of_the_certificate_was_given_to_the_person_in_need_of_care,
    IK_of_the_nursing_service,
    longer_name,
    name2,
    Straße2,
    PLZ2,
    Ort2,
    signature1,
    signature,
  } = data;
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ paddingBottom: 20 }}>
          <Image
            src={"/pdflogo.png"}
            style={{
              width: "34%",
              height: "45px",
              display: "block",
              marginLeft: "auto",
            }}
          />
        </View>

        <Text style={{ textAlign: "center", fontWeight: "700" }}>
          Nachweis über einen Beratungsbesuch nach § 37 Abs. 3 SGB XI
        </Text>
        <Text
          style={{ textAlign: "start", fontWeight: "extrabold", marginTop: 15 }}
        >
          Angaben zur pflegebedürftigen Person:
        </Text>
        <View style={styles.section}>
          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {nursing_insurance_number
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>
          <Text style={[styles.label, { marginTop: 2 }]}>
            Pflegeversichertennummer (ggf. entspricht diese der
            Krankenversichertennummer):
          </Text>
          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {name
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>
          <Text style={[styles.label, { marginTop: 3 }]}>Name:</Text>

          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {vorname
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>
          <Text style={[styles.label, { marginTop: 3 }]}>Vorname:</Text>

          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {brith_data
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>
          <Text style={[styles.label, { marginTop: 3 }]}>Geburtsdatum:</Text>

          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {straße
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>
          <Text style={[styles.label, { marginTop: 3 }]}>Straße:</Text>

          <View style={styles.row}>
            <View style={{ width: "20%", marginRight: 10 }}>
              <View style={[styles.row, {}]}>
                <View
                  style={[
                    {
                      position: "absolute",
                      left: 0,
                      bottom: "9%",
                      width: "1px",
                      height: "8px",
                      backgroundColor: "#000",
                    },
                  ]}
                />
                {plz
                  ?.replace(/\s/g, "")
                  ?.split("")
                  ?.map((value, index) => (
                    <>
                      <Text
                        style={[
                          styles.label,
                          {
                            textTransform: "uppercase",
                            width: 20,
                            borderBottom: "1px solid #000",
                            // borderTop: "0px",
                            textAlign: "center",
                            paddingTop: 7,
                          },
                        ]}
                      >
                        {value}
                        {/* {nursing_insurance_number.length} */}
                      </Text>
                      <View
                        style={[
                          {
                            position: "absolute",
                            left: (index + 1) * 20,
                            bottom: "9%",
                            width: "1px",
                            height: "8px",
                            // border: "1px solid #000",
                            borderTop: 0,
                            // padding: 5,
                            backgroundColor: "#000",
                          },
                        ]}
                      />
                    </>
                  ))}
                {/*1*/}
              </View>
              <Text style={[styles.label, { marginTop: 3 }]}>PLZ:</Text>
            </View>
            <View style={{ width: "70%" }}>
              <View style={[styles.row, {}]}>
                <View
                  style={[
                    {
                      position: "absolute",
                      left: 0,
                      bottom: "9%",
                      width: "1px",
                      height: "8px",
                      backgroundColor: "#000",
                    },
                  ]}
                />
                {ort
                  ?.replace(/\s/g, "")
                  ?.split("")
                  ?.map((value, index) => (
                    <>
                      <Text
                        style={[
                          styles.label,
                          {
                            textTransform: "uppercase",
                            width: 20,
                            borderBottom: "1px solid #000",
                            // borderTop: "0px",
                            textAlign: "center",
                            paddingTop: 7,
                          },
                        ]}
                      >
                        {value}
                        {/* {nursing_insurance_number.length} */}
                      </Text>
                      <View
                        style={[
                          {
                            position: "absolute",
                            left: (index + 1) * 20,
                            bottom: "9%",
                            width: "1px",
                            height: "8px",
                            // border: "1px solid #000",
                            // padding: 5,
                            backgroundColor: "#000",
                          },
                        ]}
                      />
                    </>
                  ))}
                {/*1*/}
              </View>
              <Text style={[styles.label, { marginTop: 3 }]}>Ort:</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text
              style={[styles.label, { paddingTop: "6px", paddingRight: "5px" }]}
            >
              Bei der o.a. pflegebedürftigen Person wurde am
            </Text>
            <View style={[styles.row, {}]}>
              <View
                style={[
                  {
                    position: "absolute",
                    left: 0,
                    bottom: "9%",
                    width: "1px",
                    height: "8px",
                    backgroundColor: "#000",
                  },
                ]}
              />
              {person_need_care
                ?.replace(/\s/g, "")
                ?.split("")
                ?.map((value, index) => (
                  <>
                    <Text
                      style={[
                        styles.label,
                        {
                          textTransform: "uppercase",
                          width: 20,
                          borderBottom: "1px solid #000",
                          // borderTop: "0px",
                          textAlign: "center",
                          paddingTop: 7,
                        },
                      ]}
                    >
                      {value}
                      {/* {nursing_insurance_number.length} */}
                    </Text>
                    <View
                      style={[
                        {
                          position: "absolute",
                          left: (index + 1) * 20,
                          bottom: "9%",
                          width: "1px",
                          height: "8px",
                          // border: "1px solid #000",
                          borderTop: 0,
                          // padding: 5,
                          backgroundColor: "#000",
                        },
                      ]}
                    />
                  </>
                ))}
              {/*1*/}
            </View>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.label, { paddingTop: "3px", paddingRight: "5px" }]}
            >
              in der Zeit* von:
            </Text>
            <Text style={styles.input}>{period}</Text>
            <Text
              style={[
                styles.label,
                { paddingTop: "3px", paddingRight: "5px", paddingleft: "10px" },
              ]}
            >
              {" "}
              Uhr bis:
            </Text>
            <Text style={styles.input}>{clock_until}</Text>
            <Text
              style={[styles.label, { paddingTop: "3px", paddingRight: "5px" }]}
            ></Text>
            <Text
              style={[styles.label, { paddingTop: "3px", paddingRight: "5px" }]}
            >
              {" "}
              Uhr ein Beratungsbesuch durchgeführt.
            </Text>
          </View>

          <Text style={[styles.hint, { marginTop: 15 }]}>
            Hinweis: Die nachfolgenden Einschätzungen werden von der
            Beratungsperson dokumentiert:
          </Text>

          <Text style={styles.label}>
            1. Die Pflege- und Betreuungssituation wird aus Sicht der
            pflegebedürftigen Person sowie der Pflegeperson wie folgt
            eingeschätzt:
          </Text>
          
          {care_support_situation?.split("\n").map((text) => (
            <Text style={styles.borderBottomInput} key={text}>
              {text}
              {console.log(
            text,
            "text-->"
          )}
            </Text>
          ))}

          <Text style={styles.label}>
            2. Die Pflege- und Betreuungssituation wird aus Sicht der
            Beratungsperson wie folgt eingeschätzt:
          </Text>
          {counsellors_point_of_view?.split("\n").map((text) => (
            <Text style={styles.borderBottomInput} key={text}>
              {text}
            </Text>
          ))}

          <Text style={styles.label}>
            3. Nach Einschätzung der Beratungsperson ist die Pflege- und
            Betreuungssituation sichergestellt:
          </Text>
          <View style={styles.row}>
            <View style={styles.checkbox}>
              {consultants_assessment === "Yes" && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Ja</Text>

            <View style={[styles.checkbox, { marginLeft: 20 }]}>
              {consultants_assessment === "No" && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Nein</Text>
          </View>
          {because?.split("\n").map((text) => (
            <Text style={styles.borderBottomInput} key={text}>
              {text}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>
          *Angabe erforderlich, sofern ein Zeitaufwand vorliegt. Pauschale mit
          Zeitbezug entfällt gem. § 37 Abs. 3 SGB XI, i.V.m § 110 SGB XI
        </Text>

        <Text style={styles.label}>
          4. Werden aus Sicht der Beratungsperson Maßnahmen zur Verbesserung der
          Pflege- und Betreuungssituation angeregt?
        </Text>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View style={styles.checkbox}>
            {no_no_measures_are_suggested && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={styles.label}>
            Nein, es werden keine Maßnahmen angeregt.
          </Text>
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View style={styles.checkbox}>
            {yes_the_following_measures_are_suggested && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={styles.label}>
            Ja, es werden folgende Maßnahmen angeregt.
          </Text>
        </View>

        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {care_course_training && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Pflegekurs/-schulung</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {combination_benefit && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Kombinationsleistung</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {substitute_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Verhinderungspflege</Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {rehabilitation_services && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Rehabilitationsleistungen</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {day_night_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Tages-/Nachtpflege</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {offers_to_support_everyday_life && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>
              Angebote zur Unterstützung im Alltag
            </Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {care_aids_technical_aids && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>
              Pflege-/Hilfsmittel/technische Hilfen
            </Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {reassessment_of_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>erneute Pflegebegutachtung</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {care_benefits_in_kind && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Pflegesachleistungen</Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {short_term_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Kurzzeitpflege</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {home_adaptation && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>Wohnraumanpassung</Text>
          </View>
          <View
            style={[styles.row, { width: "100%", marginTop: -7, padding: 0 }]}
          >
            <View style={styles.checkbox}>
              {leisure_options_care_time_family_care_time && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>
              Freizeitmöglichkeiten Pflegezeit/ Familienpflegezeit
            </Text>
          </View>
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View style={styles.checkbox}>
            {further_measures_and_explanations_of_the_above_measures && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={styles.label}>
            Weitere Maßnahmen und Erläuterungen zu o. a. Maßnahmen{" "}
          </Text>
        </View>
        <View>
          {further_measures_and_explanations_of_the_above_measures_detail
            ?.split("\n")
            .map((text) => (
              <Text style={styles.borderBottomInput} key={text}>
                {text}
              </Text>
            ))}
        </View>
        <View style={[styles.row, { marginTop: 2, padding: 0 }]}>
          <View style={styles.checkbox}>
            {counselors_point_of_view && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label,{marginTop:20}]}>
            5.Aus Sicht der Beratungsperson ist eine weitergehende Beratung nach
            § 7a SGB XI angezeigt.
          </Text>
        </View>
        <View
          style={{
            border: "1px solid #000",
            width: "100%",
            marginTop: 50,
            padding: 5,
          }}
        >
          <Text style={[styles.label]}>Information</Text>
          <Text style={[styles.label, { marginTop: 5, lineHeight: 1.4 }]}>
            Der Beratungsbesuch dient der Sicherung der Qualität der häuslichen
            Pflege und der regelmäßigen Hilfestellung und praktischen
            pflegefachlichen Unterstützung der häuslich Pflegenden (§ 37 Abs. 3
            SGB XI). Die Durchführung des Beratungsbesuches ist gegenüber der
            Pflegekasse oder dem privaten Versicherungsunternehmen zu bestätigen
            (§§ 37 Abs. 4, 106a SGB XI). Die Weitergabe der beim Beratungsbesuch
            gewonnenen Erkenntnisse über die Möglichkeiten zur Verbesserung der
            häuslichen Pflegesituation darf an die Pflegekasse oder das private
            Versicherungsunternehmen und im Fall der Beihilfeberechtigung an die
            zuständige Beihilfefestsetzungsstelle nur mit Einwilligung der
            pflegebedürftigen Person vorgenommen werden. Die Datenverarbeitung
            dient der regelmäßigen Hilfestellung und Beratung der Pflegenden zur
            Sicherung der Pflegequalität.
          </Text>
          <View style={[styles.row, { marginTop: 0, padding: 0 }]}>
            <View style={[styles.checkbox, { marginTop: -9 }]}>
              {information && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={[styles.label, { paddingRight: 10 }]}>
              Die pflegebedürftige Person und die Pflegeperson(en) wurden auch
              auf die Auskunfts-, Beratungs- und Unterstützungsmöglichkeiten der
              für sie zuständigen Pflegestützpunkte sowie der Pflegeberatung
              nach § 7a SGB XI hingewiesen.
            </Text>
          </View>
          <Text style={[styles.label, { marginTop: 0, lineHeight: 1.4 }]}>
            Der Beratungsbesuch dient der Sicherung der Qualität der häuslichen
            Pflege und der regelmäßigen Hilfestellung und praktischen
            pflegefachlichen Unterstützung der häuslich Pflegenden (§ 37 Abs. 3
            SGB XI). Die Durchführung des Beratungsbesuches ist gegenüber der
            Pflegekasse oder dem privaten Versicherungsunternehmen zu bestätigen
            (§§ 37 Abs. 4, 106a SGB XI). Die Weitergabe der beim Beratungsbesuch
            gewonnenen Erkenntnisse über die Möglichkeiten zur Verbesserung der
            häuslichen Pflegesituation darf an die Pflegekasse oder das private
            Versicherungsunternehmen und im Fall der Beihilfeberechtigung an die
            zuständige Beihilfefestsetzungsstelle nur mit Einwilligung der
            pflegebedürftigen Person vorgenommen werden. Die Datenverarbeitung
            dient der regelmäßigen Hilfestellung und Beratung der Pflegenden zur
            Sicherung der Pflegequalität.
          </Text>
          <Text style={[styles.label, { marginTop: 5, lineHeight: 1.4 }]}>
            Die Einwilligung in die Datenverarbeitung kann jederzeit bei der
            zuständigen Pflegekasse oder dem privaten Versicherungsunternehmen
            und im Fall der Beihilfeberechtigung bei der zuständigen
            Beihilfefestsetzungsstelle – auch ohne Angaben von Gründen – ganz
            oder teilweise schriftlich mit Wirkung für die Zukunft widerrufen
            werden. Nach Erhalt des Widerrufs werden die betreffenden Daten
            nicht mehr genutzt bzw. verarbeitet und gelöscht. Durch den Widerruf
            der Einwilligung wird die Rechtsmäßigkeit der aufgrund der
            Einwilligung bis zum Zeitpunkt des Widerrufs erfolgten Verarbeitung
            nicht berührt.
          </Text>
        </View>
        <Text style={styles.label}>Einwilligungserklärung:</Text>
        <View style={[styles.row, { padding: 0 }]}>
          <View style={[styles.checkbox, { alignItems: "start" }]}>
            {agree_to_the_transmission_of_the_information_4 && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label, { paddingRight: 10, lineHeight: 1.4 }]}>
            Ich stimme der Übermittlung der unter Ziffer 3. gemachten Angaben
            zur Sicherstellung der Pflege- und Betreu-ungs-situation an meine
            Pflegekasse bzw. mein privates Versicherungsunternehmen zu.
          </Text>
        </View>
        <View
          style={[styles.row, { marginTop: -7, padding: 0, lineHeight: 1.4 }]}
        >
          <View style={[styles.checkbox, { alignItems: "start" }]}>
            {further_care_advice_according_to_7a_SGB && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label, { paddingRight: 10 }]}>
            Ich stimme der Übermittlung der unter Ziffer 4. genannten
            Empfehlungen zur Verbesserung der Betreuungs- undPflegesituation an
            meine Pflegekasse bzw. mein privates Versicherungsunternehmen zu.
          </Text>
        </View>
        <View
          style={[styles.row, { marginTop: 7, padding: 0, lineHeight: 1.4 }]}
        >
          <View style={[styles.checkbox, { alignItems: "start" }]}>
            {my_nursing_care_fund_or_my_private_insurance_company && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label, { paddingRight: 10 }]}>
            Ich wünsche eine weitergehende Pflegeberatung nach § 7a SGB XI
          </Text>
        </View>
        <Text style={[styles.label, { lineHeight: 1.4 }]}>
          Im Rahmen des Beratungsbesuchs kann aufgrund des Gesamteindrucks bzw.
          auf Hinweise der pflegebedürftigen Per-son bzw. der Pflegeperson oder
          der gesetzlichen Betreuerin bzw. des gesetzlichen Betreuers zur
          Klärung von pflege-fachlichen Fragestellungen eine Inaugenscheinnahme
          von bestimmten Körperregionen durch die Beratungsperson er-forderlich
          sein. Eine solche Inaugenscheinnahme erfolgt nur mit Einwilligung der
          pflegebedürftigen Person:
        </Text>
        <View
          style={[styles.row, { marginTop: -7, padding: 0, lineHeight: 1.4 }]}
        >
          <View style={[styles.checkbox, { alignItems: "start" }]}>
            {nursing_care_advice_in_accordance_with_Section_7aSGB && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label, { paddingRight: 10 }]}>
            Ich habe einer Inaugenscheinnahme zugestimmt und stimme der
            Übermittlung dieser Information an meine Pfle-gekasse bzw. mein
            privates Versicherungsunternehmen zu.
          </Text>
        </View>
        <Text style={[styles.label, { lineHeight: 1.4 }]}>
          Im Rahmen einer Pflegeberatung nach § 7a SGB XI können die beim
          Beratungsbesuch gewonnenen Erkenntnisse von der Pflegekasse oder dem
          privaten Versicherungsunternehmen für die weitere Beratung (z. B. zu
          Unterstützungsange-boten) verarbeitet werden:
        </Text>
        <View
          style={[styles.row, { marginTop: 0, padding: 0, lineHeight: 1.4 }]}
        >
          <View style={[styles.checkbox, { alignItems: "start" }]}>
            {agree_to_the_transmission_of_the_information_3 && (
              <Svg width="12" height="12" viewBox="0 0 24 24">
                <G>
                  <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                </G>
              </Svg>
            )}
          </View>
          <Text style={[styles.label, { paddingRight: 10 }]}>
            Ich stimme der Verarbeitung der übermittelten Ergebnisse des
            Beratungsbesuches zur Pflegeberatung nach § 7aSGB XI zu.
          </Text>
        </View>

        <View style={[styles.row]}>
          <View style={{ width: "40%", marginTop: 45 }}>
            <Text style={styles.input}>{place_date}</Text>
            <Text style={[styles.formLabel]}>Ort, Datum</Text>
          </View>
          <View style={{ width: "40%", marginLeft: "auto" }}>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={signature1}
                style={{ width: "35%", height: "70px", display: "block" }}
              />
            </View>
            <Text
              style={[
                styles.formLabel,
                { borderTop: "1px solid #000", paddingTop: 5 },
              ]}
            >
              Unterschrift der pflegebedürftigen Person bzw. des gesetzlichen
              Betreuers/des Vertreters (nicht Zutreffendes streichen)
            </Text>
          </View>
        </View>

        {/* Section 2: Checkboxes */}
        <View style={styles.section}>
          <View style={[styles.checkboxContainer, { marginTop: -7 }]}>
            <View style={styles.checkbox}>
              {the_assessments_made_for_the_person_in_need_of_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>
              Die für die/ den Pflegebedürftigen getroffenen Einschätzungen
              (Ziffer 1 und 2) sind nicht dokumentiert, weil die/der
              Pflegebedürftige der Weitergabe dieser Daten nicht zugestimmt hat.
            </Text>
          </View>
          <View style={[styles.checkboxContainer, { marginTop: -7 }]}>
            <View style={styles.checkbox}>
              {copy_of_the_certificate_was_given_to_the_person_in_need_of_care && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <G>
                    <Path d="M4 12l4 4 8-8" style={styles.checkMark} />
                  </G>
                </Svg>
              )}
            </View>
            <Text style={styles.label}>
              Eine Ausfertigung des Nachweises wurde der pflegebedürftigen
              Person ausgehändigt.
            </Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={{ width: "45%" }}>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={signature}
                style={{ width: "35%", height: "70px", display: "block" }}
              />
            </View>
            <Text
              style={[
                styles.formLabel,
                { borderTop: "1px solid #000", paddingTop: 5 },
              ]}
            >
              U Stempel und Unterschrift der Beratungsperson (Pflegedienst/
              anerkannte Beratungsstelle/beauftragte Pflegefachkraft/
              Pflegeberater nach § 7a SGB XI/ kommunale Beratungsstelle)
            </Text>
          </View>
          <View style={{ width: "45%", marginLeft: "auto", marginTop: 45 }}>
            <Text style={styles.input}>{IK_of_the_nursing_service}</Text>
            <Text style={[styles.formLabel]}>
              IK des Pflegedienstes/ der anerkannten Beratungsstelle/der
              beauftragten Pflegefachkraft/ der kommunalen Beratungsstelle
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Anschrift der Pflegekasse/ des privaten Versicherungsunternehmens/
            der Beihilfefestsetzungsstelle:
          </Text>
          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {longer_name
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>{" "}
          <Text style={styles.label}>
            Name (Bei längeren Namen bitte auch die nächste Zeile mit
            verwenden.)
          </Text>
          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {name2
              ?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>{" "}
          <Text style={styles.label}>Name:</Text>
          <View style={[styles.row, {}]}>
            <View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  bottom: "9%",
                  width: "1px",
                  height: "8px",
                  backgroundColor: "#000",
                },
              ]}
            />
            {Straße2?.replace(/\s/g, "")
              ?.split("")
              ?.map((value, index) => (
                <>
                  <Text
                    style={[
                      styles.label,
                      {
                        textTransform: "uppercase",
                        width: 20,
                        borderBottom: "1px solid #000",
                        // borderTop: "0px",
                        textAlign: "center",
                        paddingTop: 7,
                      },
                    ]}
                  >
                    {value}
                    {/* {nursing_insurance_number.length} */}
                  </Text>
                  <View
                    style={[
                      {
                        position: "absolute",
                        left: (index + 1) * 20,
                        bottom: "9%",
                        width: "1px",
                        height: "8px",
                        // border: "1px solid #000",
                        borderTop: 0,
                        // padding: 5,
                        backgroundColor: "#000",
                      },
                    ]}
                  />
                </>
              ))}
            {/*1*/}
          </View>{" "}
          <Text style={styles.label}>Straße:</Text>
          <View
            style={[
              styles.row,
              {
                marginTop: 10,
              },
            ]}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <View style={[styles.row, {}]}>
                <View
                  style={[
                    {
                      position: "absolute",
                      left: 0,
                      bottom: "9%",
                      width: "1px",
                      height: "8px",
                      backgroundColor: "#000",
                    },
                  ]}
                />
                {PLZ2?.replace(/\s/g, "")
                  ?.split("")
                  ?.map((value, index) => (
                    <>
                      <Text
                        style={[
                          styles.label,
                          {
                            textTransform: "uppercase",
                            width: 20,
                            borderBottom: "1px solid #000",
                            // borderTop: "0px",
                            textAlign: "center",
                            paddingTop: 7,
                          },
                        ]}
                      >
                        {value}
                        {/* {nursing_insurance_number.length} */}
                      </Text>
                      <View
                        style={[
                          {
                            position: "absolute",
                            left: (index + 1) * 20,
                            bottom: "9%",
                            width: "1px",
                            height: "8px",
                            // border: "1px solid #000",
                            borderTop: 0,
                            // padding: 5,
                            backgroundColor: "#000",
                          },
                        ]}
                      />
                    </>
                  ))}
                {/*1*/}
              </View>{" "}
              <Text style={styles.label}>PLZ:</Text>
            </View>
            <View style={{ flex: 3 }}>
              <View style={[styles.row, {}]}>
                <View
                  style={[
                    {
                      position: "absolute",
                      left: 0,
                      bottom: "9%",
                      width: "1px",
                      height: "8px",
                      backgroundColor: "#000",
                    },
                  ]}
                />
                {Ort2?.replace(/\s/g, "")
                  ?.split("")
                  ?.map((value, index) => (
                    <>
                      <Text
                        style={[
                          styles.label,
                          {
                            textTransform: "uppercase",
                            width: 20,
                            borderBottom: "1px solid #000",
                            // borderTop: "0px",
                            textAlign: "center",
                            paddingTop: 7,
                          },
                        ]}
                      >
                        {value}
                        {/* {nursing_insurance_number.length} */}
                      </Text>
                      <View
                        style={[
                          {
                            position: "absolute",
                            left: (index + 1) * 20,
                            bottom: "9%",
                            width: "1px",
                            height: "8px",
                            // border: "1px solid #000",
                            borderTop: 0,
                            // padding: 5,
                            backgroundColor: "#000",
                          },
                        ]}
                      />
                    </>
                  ))}
                {/*1*/}
              </View>{" "}
              <Text style={styles.label}>Ort:</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadPdf;
