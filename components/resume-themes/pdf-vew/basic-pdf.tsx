import { Experience, Language, Portfolio, Profile, Project } from "@prisma/client";
import {
  Document,
  Page,
  Text,
  PDFDownloadLink,
  StyleSheet,
  PDFViewer,
  View,
  Font,
} from "@react-pdf/renderer";

type props = {
  portfolio: Portfolio & {
    experiences: Experience[];
    projects: Project[];
    profile: Profile;
    languages:Language[]
  };
};

const BasicPDF = ({ portfolio }: props) => (
  <Document>
    <Page
      style={{ padding: "45px", height: "100%", width: "100%" }}
      size={"A4"}
      wrap
    >
      <Text
        style={{
          marginHorizontal: "auto",
          textTransform: "capitalize",
          fontFamily: "Times-Roman",
        }}
      >
        {portfolio.profile.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <Text
          style={{
            fontSize: "10px",
            color: "#555555",
            fontFamily: "Times-Roman",
          }}
        >
          {portfolio.country}
        </Text>

        <Text
          style={{
            fontSize: "10px",
            color: "#555555",
            fontFamily: "Times-Roman",
          }}
        >
          {portfolio.tel}
        </Text>
        <Text
          style={{
            fontSize: "10px",
            color: "#555555",
            fontFamily: "Times-Roman",
          }}
        >
          {}
          {portfolio.email}
        </Text>
        <Text
          style={{
            fontSize: "10px",
            color: "#555555",
            fontFamily: "Times-Roman",
          }}
        >
          {portfolio.linkedin}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "heavy",
            fontSize: "15px",
            marginTop: "25px",
            borderBottom: "1px black solid",
            paddingBottom: "1px",
            textTransform: "uppercase",
            fontFamily: "Times-Roman",
          }}
        >
          Summary
        </Text>
        <Text
          style={{
            fontSize: "10px",
            marginTop: "2px",
            color: "#555555",
            fontFamily: "Times-Roman",
          }}
        >
          {portfolio.bio}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "heavy",
            fontSize: "15px",
            marginTop: "25px",
            borderBottom: "1px black solid",
            paddingBottom: "1px",
            textTransform: "uppercase",
            fontFamily: "Times-Roman",
          }}
        >
          Experience
        </Text>
        {portfolio.experiences.map((experience) => (
          <View key={experience.id} style={{ marginTop: "4px" }}>
            <Text
              style={{
                fontSize: "12px",
                marginTop: "10px",
                fontWeight: "extrabold",
                textTransform: "capitalize",
                fontFamily: "Times-Roman",
              }}
            >
              {experience.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  marginTop: "2px",
                  fontWeight: "heavy",
                  textTransform: "capitalize",
                  fontFamily: "Times-Roman",
                }}
              >
                {experience.place}
              </Text>
              <View
                style={{ flexDirection: "row", gap: "5px", marginTop: "2px" }}
              >
                <Text style={{ fontSize: "10px", fontFamily: "Times-Roman" }}>
                  {experience.startDate?.toLocaleDateString()}
                </Text>
                <Text style={{ fontSize: "10px", fontFamily: "Times-Roman" }}>
                  {experience.endDate?.toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={{paddingLeft:'2px'}}>
              {experience.achievments.map((achievment) => (
                <Text
                  style={{
                    fontSize: "10px",
                    marginTop: "2px",
                    color: "#555555",
                    fontFamily: "Times-Roman",
                  }}
                  key={achievment}
                >
                  &bull; {achievment}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
      <View>
        <Text
          style={{
            fontWeight: "heavy",
            fontSize: "15px",
            marginTop: "25px",
            borderBottom: "1px black solid",
            paddingBottom: "1px",
            textTransform: "uppercase",
            fontFamily: "Times-Roman",
          }}
        >
          skills
        </Text>
        <View style={{ flexDirection: "row", gap: "5px" }}>
          {portfolio.skills.map((skill, i) => (
            <Text
              key={skill}
              style={{
                fontSize: "10px",
                marginTop: "2px",
                color: "#555555",
                fontFamily: "Times-Roman",
              }}
            >
              {i !== 0 && " - "}
              {skill}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "heavy",
            fontSize: "15px",
            marginTop: "25px",
            borderBottom: "1px black solid",
            paddingBottom: "1px",
            textTransform: "uppercase",
            fontFamily: "Times-Roman",
          }}
        >
          languages
        </Text>
        <View style={{ flexDirection: "row", gap: "5px" }}>
          {portfolio.languages.map((language, i) => (
            <View      key={language.id} style={{flexDirection:'row',gap:'1px',alignItems:'center'}}>
              {i !== 0 && <Text style={{
                fontSize: "10px",
                marginTop: "2px",
                color: "#555555",
                fontFamily: "Times-Roman",
                textTransform:'capitalize'
              }} >- </Text>}
                <Text
         
              style={{
                fontSize: "10px",
                marginTop: "2px",
                color: "#555555",
                fontFamily: "Times-Roman",
                textTransform:'capitalize'
              }}
            >
          {language.language}:
            </Text>
                <Text
         
              style={{
                fontSize: "10px",
                marginTop: "2px",
                color: "#555555",
                fontFamily: "Times-Roman",
                textTransform:'capitalize'
              }}
            >
        {" "}{language.level}
            </Text>
            </View>
          
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default BasicPDF;
