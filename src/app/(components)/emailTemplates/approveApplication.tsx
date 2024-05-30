import * as React from "react";
import { SlEnvolope } from "react-icons/sl";

interface EmailTemplateProps {
  firstName: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  subject,
}) => (
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
          THANKS FOR SIGNING UP!
        </div>
        <div
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: "700",
            textTransform: "capitalize",
          }}
        >
          Confirm your E-mail Address
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
        {subject}.
      </p>
      <p
        style={{
          marginTop: "8px",
          lineHeight: "1.75",
          color: "#718096",
          textAlign: "center",
        }}
      >
        we are grad to let you know that your application has been approved by
        RPMFA.
      </p>
      <p style={{ marginTop: "32px", color: "#718096", textAlign: "center" }}>
        Thank you, <br />
        RPMFA Regards
      </p>
    </main>
  </div>
);
