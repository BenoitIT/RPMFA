import * as React from "react";

interface EmailTemplateProps {
  subject: string|number;
}

export const EmailContributionTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ subject }) => (
  <div style={{ width: "95%", maxWidth: "600px", margin: "auto" }}>
  <main
    style={{
      marginTop: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ color: "#2A5568", textAlign: "left", margin: "0 0 15px" }}>
    Dear Esteemed members,
    </h2>
    <p style={{ textAlign: "left", color: "#718096", margin: "0 0 15px" }}>
    We would like to remind you to pay membership fee for year {subject}
    </p>
    <p
      style={{
        lineHeight: "1.75",
        color: "#718096",
        textAlign: "left",
        margin: "0 0 15px",
      }}
    >
      For any support or clarification, you may contact the following people:
    </p>
    <p style={{ color: "#718096", textAlign: "left", margin: "0 0 10px" }}>
      1. Henriette Iradukunda, Admin, <b>+250 785 143 731</b>
    </p>
    <p style={{ color: "#718096", textAlign: "left", margin: "0 0 10px" }}>
      2. Christian Ntakirutimana, Executive Secretary <b>+250 788 515 358</b>
    </p>
    <p
      style={{
        lineHeight: "1.75",
        color: "#718096",
        textAlign: "left",
        margin: "0 0 15px",
      }}
    >
      We wish you a productive day.
    </p>
    <p
      style={{
        lineHeight: "1.75",
        color: "#718096",
        textAlign: "left",
        margin: "0 0 15px",
      }}
    >
      RPMFA Secretariat.
    </p>
  </main>
</div>
);
