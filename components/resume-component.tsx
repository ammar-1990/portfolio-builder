"use client";

import { Experience, Image, Portfolio, Profile, Project } from "@prisma/client";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, ShowerHeadIcon, Smartphone, XIcon } from "lucide-react";
import TipTool from "./tip-tool";
import { Roboto } from "next/font/google";

type Props = {
  portfolio: Portfolio & {
    profile: Profile;
    experiences: Experience[];
    projects: Project[];
  };
};
Font.register({
  family: "Rubik",
  src: "https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYiFWkU1Z4Y.woff2",
});

const ResumeComponent = ({ portfolio }: Props) => {
  const [mount, setMount] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const styles = StyleSheet.create({});

  const MyDocument = () => (
    <Document>
      <Page style={{ padding: 20, height: "100%", width: "100%" }} size={"A4"}>
        <Text style={{ marginHorizontal: "auto", textTransform: "capitalize",}}>
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
          <Text style={{ fontSize: "10px", color: "#555555" }}>
            {portfolio.country}
          </Text>

          <Text style={{ fontSize: "10px", color: "#555555" }}>
            {portfolio.tel}
          </Text>
          <Text style={{ fontSize: "10px", color: "#555555" }}>
            {}
            {portfolio.email}
          </Text>
          <Text style={{ fontSize: "10px", color: "#555555" }}>
            {portfolio.linkedin}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "heavy",
              fontSize: "20px",
              marginTop: "10px",
              borderBottom: "1px black solid",
              paddingBottom: "1px",
              textTransform: "uppercase",
            }}
          >
            Summary
          </Text>
          <Text
            style={{ fontSize: "10px", marginTop: "2px", color: "#555555" }}
          >
            {portfolio.bio}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "heavy",
              fontSize: "20px",
              marginTop: "10px",
              borderBottom: "1px black solid",
              paddingBottom: "1px",
              textTransform: "uppercase",
            }}
          >
            Experience
          </Text>
          {portfolio.experiences.map((experience) => (
            <View key={experience.id} style={{ marginTop: "4px" }}>
              <Text
                style={{
                  fontSize: "12px",
                  marginTop: "2px",
                  fontWeight: "extrabold",
                  textTransform: "capitalize",
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
                  }}
                >
                  {experience.place}
                </Text>
                <View
                  style={{ flexDirection: "row", gap: "5px", marginTop: "2px" }}
                >
                  <Text style={{ fontSize: "10px" }}>
                    {experience.startDate?.toLocaleDateString()}
                  </Text>
                  <Text style={{ fontSize: "10px" }}>
                    {experience.endDate?.toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <Text
                style={{ fontSize: "10px", marginTop: "2px", color: "#555555" }}
              >
                {experience.description}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <Text
            style={{
              fontWeight: "heavy",
              fontSize: "20px",
              marginTop: "10px",
              borderBottom: "1px black solid",
              paddingBottom: "1px",
              textTransform: "uppercase",
            }}
          >
            skills
          </Text>
          <View style={{ flexDirection: "row", gap: "5px" }}>
            {portfolio.skills.map((skill, i) => (
              <Text
                key={skill}
                style={{ fontSize: "10px", marginTop: "2px", color: "#555555" }}
              >
                {i !== 0 && " - "}
                {skill}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  if (!mount) return null;

  return (
    <div className="">
      <Button className="mt-10" onClick={() => setShow(true)} variant={"ghost"}>
        Show Resume Full screen <EyeIcon className="w-4 h-4 ml-2" />
      </Button>

      {show && (
        <PDFViewer
          className="fixed inset-0 noScroll z-40"
          style={{ width: "100%", height: "100%" }}
        >
          <MyDocument />
        </PDFViewer>
      )}
      {show && (
        <TipTool title="Close" side="top">
          <span
            onClick={() => setShow(false)}
            className="bg-white cursor-pointer transition hover:scale-110 active:scale-90 rounded-full flex items-center justify-center w-10 h-10 fixed bottom-10 right-10 z-50 "
          >
            {" "}
            <XIcon className="w-4 h-4 " />
          </span>
        </TipTool>
      )}
    </div>
  );
};

export default ResumeComponent;
