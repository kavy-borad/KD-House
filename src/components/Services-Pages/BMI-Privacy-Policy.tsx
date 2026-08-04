import React from "react";
import { Helmet } from "react-helmet-async";

const BMIPrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>BMI Calculator Privacy Policy - Karmadude</title>
        <meta
          name="description"
          content="Privacy Policy for BMI Calculator by Karmadude - Learn how we collect, use, and protect your personal health information."
        />
        <meta
          name="keywords"
          content="BMI Calculator, Privacy Policy, Health Data, Data Protection, Karmadude"
        />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800 pt-4 lg:pt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-4 lg:mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy for BMI Calculator
            </h1>
            <div className="  text-gray-600">
              <p>
                <strong>Last Updated:</strong> November 5, 2025
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1: Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to BMI Calculator ("we," "us," "our," or "the App"). We
                are committed to protecting your privacy and ensuring
                transparency about how we handle your information. This Privacy
                Policy explains what data we collect, how we use it, and your
                rights regarding your personal information when you use our
                mobile application.
              </p>
              <p>
                By using BMI Calculator, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                2.1 Personal Information You Provide
              </h3>
              <p className="mb-3">
                When you use BMI Calculator, we collect the following
                information that you voluntarily provide:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Name:</strong> To personalize your experience and
                  identify your BMI records
                </li>
                <li>
                  <strong>Height (in centimeters):</strong> Required for
                  accurate BMI calculation
                </li>
                <li>
                  <strong>Weight (in kilograms):</strong> Required for accurate
                  BMI calculation
                </li>
                <li>
                  <strong>Age:</strong> Used for age-appropriate health
                  assessments and BMI interpretation
                </li>
                <li>
                  <strong>Gender:</strong> Used for personalized BMI
                  interpretation and health recommendations
                </li>
                <li>
                  <strong>Email Address (Optional):</strong> Only if you choose
                  to create an account for syncing data across devices
                </li>
                <li>
                  <strong>Profile Picture (Optional):</strong> If you choose to
                  upload a photo to personalize your profile
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Device ID:</strong> A unique identifier for your
                  device (Android ID or iOS Identifier for Vendor), used to
                  associate your BMI records with your device when you use the
                  app without registration
                </li>
                <li>
                  <strong>Device Information:</strong> Device model, operating
                  system version (for app compatibility and performance
                  optimization)
                </li>
                <li>
                  <strong>Usage Data:</strong> BMI calculation history,
                  timestamps of calculations
                </li>
                <li>
                  <strong>Network Information:</strong> Internet connectivity
                  status (required for cloud sync features)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                2.3 Information We Do NOT Collect
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We do NOT collect precise location data</li>
                <li>We do NOT access your contacts or address book</li>
                <li>We do NOT collect financial information</li>
                <li>
                  We do NOT track your activity across other apps or websites
                </li>
                <li>
                  We do NOT use third-party analytics or advertising SDKs that
                  track user behavior
                </li>
              </ul>
            </section>

            {/* Section 3: How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                3.1 Core Functionality
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>BMI Calculation:</strong> Process your height, weight,
                  age, and gender to calculate your Body Mass Index
                </li>
                <li>
                  <strong>Health Insights:</strong> Provide personalized BMI
                  interpretation based on WHO and health authority guidelines
                </li>
                <li>
                  <strong>History Tracking:</strong> Store your BMI calculations
                  to help you track your health progress over time
                </li>
                <li>
                  <strong>Data Sync:</strong> Synchronize your data across
                  devices if you create an account
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                3.2 App Improvement
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Performance Optimization:</strong> Identify and fix
                  technical issues
                </li>
                <li>
                  <strong>Feature Enhancement:</strong> Understand how users
                  interact with the app to improve functionality
                </li>
                <li>
                  <strong>User Support:</strong> Respond to your inquiries and
                  provide customer support
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                3.3 Communication (Only if you opt-in)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Send important updates about the app</li>
                <li>Notify you about new features or improvements</li>
              </ul>
            </section>

            {/* Section 4: Data Storage and Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Data Storage and Security
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                4.1 Where Your Data is Stored
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  All personal data is stored securely on{" "}
                  <strong>Supabase</strong> cloud infrastructure, which complies
                  with industry-standard security practices
                </li>
                <li>
                  Supabase servers are located in secure data centers with
                  physical and digital security measures
                </li>
                <li>
                  Data is stored in compliance with data protection regulations
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                4.2 Security Measures
              </h3>
              <p className="mb-3">
                We implement comprehensive security measures to protect your
                information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Encryption in Transit:</strong> All data transmitted
                  between your device and our servers uses TLS/SSL encryption
                </li>
                <li>
                  <strong>Encryption at Rest:</strong> Your data is encrypted
                  when stored on our servers
                </li>
                <li>
                  <strong>Access Controls:</strong> Strict access controls
                  ensure only authorized systems can access your data
                </li>
                <li>
                  <strong>Regular Security Updates:</strong> We regularly update
                  our security protocols and software
                </li>
                <li>
                  <strong>Device-Level Security:</strong> Your device ID is used
                  as a secure identifier for local data storage
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                4.3 Data Isolation
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Your BMI records are isolated and associated only with your
                  device ID or user account
                </li>
                <li>
                  No data is shared between users without explicit consent
                </li>
              </ul>
            </section>

            {/* Section 5: Data Sharing and Disclosure */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Data Sharing and Disclosure
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                5.1 We Do NOT Sell Your Data
              </h3>
              <p className="mb-4">
                We do not sell, rent, or trade your personal information to
                third parties for marketing purposes.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                5.2 Third-Party Service Providers
              </h3>
              <p className="mb-3">
                We use the following third-party services that may process your
                data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Supabase:</strong> Cloud database and authentication
                  service (Privacy Policy: https://supabase.com/privacy)
                </li>
                <li>
                  These services are bound by data processing agreements and
                  only access data necessary to provide their services
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                5.3 Legal Requirements
              </h3>
              <p className="mb-3">
                We may disclose your information if required by law, such as:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  To comply with a court order, subpoena, or legal process
                </li>
                <li>
                  To protect the rights, property, or safety of BMI Calculator,
                  our users, or the public
                </li>
                <li>
                  In connection with a merger, acquisition, or sale of assets
                  (users will be notified)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                5.4 No Third-Party Advertising
              </h3>
              <p>
                We do not integrate third-party advertising networks, and your
                data is never shared for advertising purposes.
              </p>
            </section>

            {/* Section 6: Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Data Retention
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                6.1 Retention Period
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>BMI Records:</strong> Retained indefinitely until you
                  delete them or uninstall the app
                </li>
                <li>
                  <strong>Account Data:</strong> If you create an account, data
                  is retained as long as your account remains active
                </li>
                <li>
                  <strong>Device Data:</strong> Data associated with your device
                  ID is retained until you clear app data or uninstall
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                6.2 Data Deletion
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  You can delete individual BMI records at any time through the
                  app's history screen
                </li>
                <li>
                  You can delete your entire account and all associated data by
                  contacting us
                </li>
                <li>
                  When you uninstall the app, local data is removed from your
                  device (cloud data remains until you request deletion)
                </li>
              </ul>
            </section>

            {/* Section 7: Your Rights and Choices */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="mb-4">
                You have the following rights regarding your personal
                information:
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7.1 Access and Portability
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>View Your Data:</strong> Access all your BMI records
                  within the app
                </li>
                <li>
                  <strong>Export Your Data:</strong> Request a copy of your data
                  in a machine-readable format (contact us)
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7.2 Correction and Update
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Edit Information:</strong> Update your name, age,
                  gender, or profile picture at any time through the app
                  settings
                </li>
                <li>
                  <strong>Correct Errors:</strong> Request correction of
                  inaccurate data
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7.3 Deletion
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Delete Records:</strong> Remove individual BMI
                  calculations from your history
                </li>
                <li>
                  <strong>Delete Account:</strong> Request complete deletion of
                  your account and all associated data
                </li>
                <li>
                  <strong>Right to be Forgotten:</strong> Request permanent
                  deletion of all your personal information
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7.4 Opt-Out
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Email Communications:</strong> Unsubscribe from
                  optional emails (if applicable)
                </li>
                <li>
                  <strong>Data Collection:</strong> Stop using the app if you do
                  not wish to have your data collected
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                7.5 How to Exercise Your Rights
              </h3>
              <p className="mb-3">
                To exercise any of these rights, please contact us at:
              </p>
              <p className="mb-2">
                <strong>Email:</strong> privacy@karmadude.com
              </p>
              <p>
                <strong>Response Time:</strong> We will respond to all requests
                within 30 days
              </p>
            </section>

            {/* Section 8: Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Children's Privacy
              </h2>
              <p className="mb-4">
                BMI Calculator is intended for general audiences and may be used
                by individuals of all ages, including children under 13, with
                parental consent.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                8.1 Parental Consent
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  If you are under 13 years old, please obtain permission from
                  your parent or guardian before using this app
                </li>
                <li>
                  Parents should supervise their children's use of the app
                </li>
                <li>
                  We do not knowingly collect personal information from children
                  without parental consent
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                8.2 COPPA Compliance (US)
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  We comply with the Children's Online Privacy Protection Act
                  (COPPA)
                </li>
                <li>
                  If we become aware that we have collected personal information
                  from a child under 13 without parental consent, we will take
                  steps to delete that information
                </li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                8.3 Parental Controls
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Parents can request access to their child's data</li>
                <li>
                  Parents can request deletion of their child's data at any time
                </li>
              </ul>
            </section>

            {/* Section 9: International Data Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. International Data Transfers
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Our cloud service provider (Supabase) may store data on
                  servers located in various countries
                </li>
                <li>
                  By using the app, you consent to the transfer of your
                  information to countries outside your country of residence
                </li>
                <li>
                  We ensure that appropriate safeguards are in place to protect
                  your data in accordance with this Privacy Policy
                </li>
              </ul>
            </section>

            {/* Section 10: Changes to This Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Changes to This Privacy Policy
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                10.1 Updates
              </h3>
              <p className="mb-3">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. When we make
                significant changes, we will notify you through:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>In-app notification</li>
                <li>Email (if you have an account)</li>
                <li>Updated "Last Updated" date at the top of this policy</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                10.2 Your Continued Use
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Your continued use of BMI Calculator after any changes
                  indicates your acceptance of the updated Privacy Policy
                </li>
                <li>We encourage you to review this policy periodically</li>
              </ul>
            </section>

            {/* Section 11: Data Security Incidents */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Data Security Incidents
              </h2>
              <p className="mb-3">
                In the unlikely event of a data breach that affects your
                personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We will notify affected users within 72 hours</li>
                <li>We will take immediate steps to mitigate any harm</li>
                <li>
                  We will provide guidance on protective measures you can take
                </li>
              </ul>
            </section>

            {/* Section 12: Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>

              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <p className="mb-2">
                  <strong>Developer/Company Name:</strong> Karmadude
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> karmadudeitsolutions@gmail.com
                </p>
                <p className="mb-2">
                  <strong>Support Email:</strong> karmadudeitsolutions@gmail.com
                </p>
                <p>
                  <strong>Website:</strong> https://karmadude.com
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                For Privacy-Related Inquiries:
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Data Access Requests: karmadudeenterprise@gmail.com</li>
                <li>Data Deletion Requests: karmadudeenterprise@gmail.com</li>
                <li>
                  General Privacy Questions: karmadudeenterprise@gmail.com
                </li>
              </ul>
              <p>We will respond to all inquiries within 30 days.</p>
            </section>

            {/* Section 13: Legal Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Legal Compliance
              </h2>
              <p className="mb-3">This Privacy Policy complies with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  General Data Protection Regulation (GDPR) - European Union
                </li>
                <li>California Consumer Privacy Act (CCPA) - United States</li>
                <li>
                  Children's Online Privacy Protection Act (COPPA) - United
                  States
                </li>
                <li>Google Play Store Data Safety Requirements</li>
                <li>Other applicable data protection laws</li>
              </ul>
            </section>

            {/* Section 14: Your Consent */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Your Consent
              </h2>
              <p className="mb-3">By using BMI Calculator, you consent to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  The collection and use of information as described in this
                  Privacy Policy
                </li>
                <li>The storage of your data on cloud servers</li>
                <li>The use of your device ID for record association</li>
              </ul>

              <p className="mb-3">
                You can withdraw your consent at any time by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Deleting your account</li>
                <li>Uninstalling the app</li>
                <li>Contacting us to request data deletion</li>
              </ul>
            </section>

            {/* Summary Section */}
            <section className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Summary</h2>
              <p className="mb-4 text-blue-800">
                BMI Calculator collects your name, height, weight, age, and
                gender to calculate and track your BMI. We use Supabase for
                secure cloud storage, implement strong encryption, and never
                sell your data to third parties. You have full control over your
                data and can delete it at any time. We do not use third-party
                advertising or analytics that track user behavior.
              </p>
              <p className="mb-4 text-blue-800">
                <strong>Questions?</strong> Contact us at privacy@karmadude.com
              </p>

              <h3 className="text-lg font-bold text-blue-900 mb-2">
                You have the right to:
              </h3>
              <ul className="list-disc pl-6 text-blue-800 space-y-1">
                <li>
                  <strong>Access</strong> your personal data
                </li>
                <li>
                  <strong>Update</strong> or correct your information within the
                  app
                </li>
                <li>
                  <strong>Delete</strong> your data by uninstalling the app or
                  contacting us
                </li>
                <li>
                  <strong>Opt-out</strong> of data collection by not using the
                  app
                </li>
              </ul>
            </section>

            {/* Data We Do NOT Collect */}
            <section className="mb-8 bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h2 className="text-2xl font-bold text-red-900 mb-4">
                Data We Do NOT Collect
              </h2>
              <ul className="list-disc pl-6 text-red-800 space-y-2">
                <li>We do NOT collect location data</li>
                <li>We do NOT access your contacts</li>
                <li>We do NOT collect payment information</li>
                <li>We do NOT track your browsing history</li>
                <li>
                  We do NOT collect biometric data beyond the height/weight you
                  voluntarily enter
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default BMIPrivacyPolicy;
