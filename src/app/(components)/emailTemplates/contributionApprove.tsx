import * as React from "react";
import { SlEnvolope } from "react-icons/sl";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailContApproveTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ firstName }) => (
  <div style={{ width: "100%" }}>
    <div
      style={{
        height: "150px",
        backgroundColor: "#365CCE",
        width: "100%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{ width: "40px", height: "1px", backgroundColor: "white" }}
        ></div>
        <SlEnvolope style={{ fontSize: "1.125rem", color: "blue" }} />
        <div
          style={{ width: "40px", height: "1px", backgroundColor: "white" }}
        ></div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            letterSpacing: "0.1em",
            fontWeight: "400",
            marginBottom: "10px",
          }}
        >
          Thank you for being impeccable member of RPMFA!
        </div>
      </div>
    </div>
    <main
      style={{
        marginTop: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingRight: "20px",
      }}
    >
      <h2 style={{ color: "#4A5568", textAlign: "center" }}>
        Hello {firstName}!
      </h2>
      <p
        style={{
          marginTop: "8px",
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "center",
        }}
      >
        Payment of membership contribution is approved!
      </p>
      <p
        style={{
          marginTop: "8px",
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "center",
        }}
      >
        We are delighted to inform you that your contribution fees have been
        successfully processed and approved. Your membership is now active. We
        are excited to have you on board and look forward to your valuable
        contributions.
      </p>
      <p style={{ marginTop: "32px", color: "#718096", textAlign: "center" }}>
        Thank you, <br />
        RPMFA Regards
      </p>
    </main>
  </div>
);
