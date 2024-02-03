import Button from "./RectangleButton";

const TermsBox = () => {
  return (
    <div>
      <div
        style={{
          width: "500px",
          height: "640px",
          backgroundColor: "#F3FFEF",
          borderRadius: "15px",
          border: "5px solid #69BF96",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "120px",
            backgroundColor: "#339F6B",
          }}
        >
          <h1 style={{ fontSize: "32px", textAlign: "center", color: "white" }}>
            <strong>Terms and Conditions</strong>
          </h1>
        </div>
        <div
          className="scroll-bar"
          style={{
            marginLeft: "50px",
            marginRight: "40px",
            marginTop: "40px",
            overflowY: "scroll",
            height: "360px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <h2 style={{ fontSize: "24px" }}>
            <strong>Introduction</strong>
          </h2>
          <p>
            These terms and conditions govern your use of our website. By
            accessing and using our website, you accept and agree to be bound by
            the terms and conditions outlined below. If you do not agree to
            these terms and conditions, please do not use our website.
          </p>

          <h2 style={{ fontSize: "24px" }}>
            <strong>Privacy Policy</strong>
          </h2>
          <p>
            Privacy Policy This Privacy Policy outlines how [Your Company Name]
            collects, uses, and protects the personal information of its users.
            By using our [website/app/service], you consent to the practices
            described in this policy. 1. Information We Collect 1.1 Personal
            Information: We may collect the following personal information from
            users: - Name - Contact information (such as email address, phone
            number, mailing address) - Demographic information (such as age,
            gender, location) - Other information relevant to customer surveys
            and offers 1.2 Non-Personal Information: We may also collect
            non-personal information about users when they interact with our
            [website/app/service]. This may include: - Browser information -
            Device information - Log data (e.g., IP addresses, access times,
            referring URLs) 2. How We Use the Information 2.1 Personal
            Information: We may use the personal information we collect for the
            following purposes: - To provide and improve our
            [website/app/service] - To personalize user experience - To
            communicate with users (e.g., respond to inquiries, provide updates)
            - To send promotional emails or newsletters - To process
            transactions or fulfill orders - To comply with legal obligations
            2.2 Non-Personal Information: The non-personal information we
            collect may be used for analytics, monitoring, and improving our
            [website/app/service] and its performance. 3. Information Sharing We
            do not sell, trade, or rent users&apos; personal information to
            third parties. However, we may share personal information with
            trusted third-party service providers who assist us in operating our
            business, conducting transactions, or providing services to users.
            These third parties are required to maintain the confidentiality and
            security of the personal information. We may also disclose personal
            information if required by law or to protect our rights, safety, or
            property, or the rights, safety, or property of others. 4. Security
            We are committed to ensuring the security of users&apos; personal
            information. We implement appropriate technical and organizational
            measures to protect against unauthorized access, alteration,
            disclosure, or destruction of personal information. 5. Third-Party
            Websites Our [website/app/service] may contain links to third-party
            websites. We have no control over the content, privacy practices, or
            security of these third-party websites. We encourage users to review
            the privacy policies of these websites before providing any personal
            information. 6. Children&apos;s Privacy Our [website/app/service] is
            not intended for use by individuals under the age of [insert minimum
            age requirement]. We do not knowingly collect personal information
            from children. If we become aware that we have inadvertently
            collected personal information from a child under the applicable age
            limit, we will take steps to delete the information as soon as
            possible. 7. Updates to this Privacy Policy We reserve the right to
            update or modify this Privacy Policy at any time. Any changes will
            be effective immediately upon posting the updated policy on our
            [website/app/service]. We encourage users to review this policy
            periodically for any updates. 8. Contact Us If you have any
            questions or concerns about this Privacy Policy or our data
            practices, please contact us at [contact details].
          </p>

          <h2 style={{ fontSize: "24px" }}>
            <strong>Changes to Terms and Conditions</strong>
          </h2>
          <p>
            We reserve the right to modify or update these terms and conditions
            at any time without prior notice. It is your responsibility to
            review these terms and conditions periodically for any changes. Your
            continued use of our website after any modifications or updates
            constitutes your acceptance of the revised terms and conditions.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Button
            text="Accept"
            onClick={""}
            style={{
              background: "#339F6B",
              borderRadius: "4px",
              width: "130px",
              height: "70px",
            }}
            textStyle={{ color: "white", fontSize: "28px" }}
          />
          <Button
            text="Decline"
            onClick={""}
            style={{
              background: "white",
              border: "4px solid #E4E4E4",
              width: "130px",
              height: "70px",
            }}
            textStyle={{ color: "#A7A7A7", fontSize: "28px" }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default TermsBox;
