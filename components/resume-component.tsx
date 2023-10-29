"use client";

import { Experience, Image, Portfolio, Profile, Project } from "@prisma/client";
import BasicPDF from "./resume-themes/pdf-vew/basic-pdf";
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
import ReactPDF from '@react-pdf/renderer';
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { EyeIcon, ShowerHeadIcon, Smartphone, XIcon } from "lucide-react";
import TipTool from "./tip-tool";
import { Roboto } from "next/font/google";
import ResumeBasic from "./resume-themes/react/basic-resume";

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

  

  if (!mount) return null;




  return (
    <div className="p-5">
      <Button className="mt-10 hidden lg:flex  items-center" onClick={() => setShow(true)} variant={"ghost"}>
        Show Resume Full screen <EyeIcon className="w-4 h-4 ml-2" />
      </Button>


  
        <PDFDownloadLink document={<BasicPDF portfolio={portfolio} />} fileName="resume.pdf">
          {({ loading }) =>
            loading ? (
              <Button className="lg:hidden flex"  variant={'ghost'} disabled>Downloading...</Button>
            ) : (
              <Button className="lg:hidden flex" variant={'ghost'}>Download Resume</Button>
            )
          }
        </PDFDownloadLink>
        <div className="w-fit mt-8 h-full rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-black transition">
          <ResumeBasic portfolio={portfolio} />
        </div>



      {show && (
        <PDFViewer
          className="fixed inset-0 noScroll z-40"
          style={{ width: "100%", height: "100%" }}
        >
          <BasicPDF portfolio={portfolio} />
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
