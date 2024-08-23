import * as React from "react";

interface EmailFacilityCreationTemplateProps {
  firstName: string;
  email: string;
  appUrl: string;
  facilityName: string;
}

export const EmailFacilityCreationTemplate: React.FC<
  Readonly<EmailFacilityCreationTemplateProps>
> = ({ firstName, email, appUrl, facilityName }) => {
  return (
    <div style={{ width: "98%" }}>
      <main
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginRight: "20px",
          marginLeft: "5px",
        }}
      >
        <h2 style={{ color: "#2A5568", textAlign: "left" }}>
          Dear {firstName},
        </h2>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          This serves to notify you that an account has been created for your
          facility <b>{facilityName}</b> on RPMFA MIS.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Below are your credentials:
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          Username:<b>{email}</b>
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          These are the next steps:
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Next steps:
        </p>
        <div>
          <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
            1. Log into the system by clicking{" "}
            <a
              href={`/${appUrl.replace(/^https?:\/\//, "")}/auth/login`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              here
            </a>
          </p>
          <p style={{ marginTop: "1px", color: "#718096", textAlign: "left" }}>
            2. Update your password by clicking{" "}
            <a
              href={`/${appUrl.replace(/^https?:\/\//, "")}/auth/forgot_password`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              here
            </a>
          </p>
          <p style={{ marginTop: "1px", color: "#718096", textAlign: "left" }}>
            3. Update your {"facility's"} information, including the upload of
            any
          </p>
        </div>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          For any support or clarification, you may contact the following
          people:
        </p>
        <p style={{ marginTop: "2px", color: "#718096", textAlign: "left" }}>
          1. Angelo Igitego, Software Engineer, <b>+250 788 597 772</b>
        </p>
        <p style={{ marginTop: "1px", color: "#718096", textAlign: "left" }}>
          2. Henriette Iradukunda, Admin, <b>+250 785 123 731</b>
        </p>
        <p style={{ marginTop: "1px", color: "#718096", textAlign: "left" }}>
          3. Christian Ntakirutimana, Executive Secretary,{" "}
          <b>+250 788 515 358</b>
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          We wish you a productive day.
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          Best regards,
        </p>
        <p
          style={{
            marginTop: "2px",
            lineHeight: "1.75",
            color: "#718096",
            textAlign: "left",
          }}
        >
          RPMFA Secretariat.
        </p>
      </main>
    </div>
  );
};
