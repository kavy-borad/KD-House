import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-5">
        {/* Header Section */}
        <br />
        <br />
        <br />
        <br />
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-14">
            Karma Dude Data Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Protecting your privacy, securing your trust
          </p>
        </header>

        {/* Main Content */}
        <section className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Karma Dude is committed to respecting your privacy while using our
            website. This Karma Dude Data Privacy Policy (“Policy”) defines the
            requirements to ensure compliance with the applicable data privacy
            laws and regulations applicable to Karma Dude’s collection, use, and
            transmission of Personal Data and Sensitive Personal Data for
            information collected by us about you.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            At Karma Dude, the confidentiality of your project and the security
            of your data is of utmost importance. We have competent measures in
            place that ensure the security of your data in our development
            center.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Not only your data security is a critical element for maintaining a
            long-term relationship with you, but your data is also what your
            business is based on, and by taking care of your business, we take
            care of our business too.
          </p>
        </section>

        {/* Data Security Measures */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6 border-b-2 border-gray-200 pb-2">
            Data Security Measures
          </h2>
          <p className="text-gray-700 mb-6 italic">
            Here are a few bullet points that highlight the data security
            measures we take:
          </p>

          {/* Security Subsection with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-700 mt-4 mb-3">
                Security
              </h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">
                  <strong>Personal Data:</strong> Any information of Data
                  Subject which can reasonably associate or link to an
                  identifiable natural person or could include anyone who can be
                  identified, directly or indirectly, in particular by reference
                  to an identifier such as a name, an identification number,
                  location data, an online identifier or to one or more factors
                  specific to the physical, physiological, economic, cultural or
                  social identity of that natural person.
                </li>
                <li className="mb-2">
                  Daily scanning of all workstations and servers.
                </li>
                <li>
                  All communication or data interchange from workstations are
                  controlled and properly logged to ensure the highest level of
                  protection for the client’s data and intellectual property.
                </li>
              </ul>
            </div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Office security setup"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Client NDA Subsection with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-700 mt-4 mb-3">
                Client NDA
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We require an NDA (Non-Disclosure Agreement) with our clients to
                ensure a confidential development environment and
                confidentiality within each project. We openly discuss at length
                issues regarding security and other areas of concern. This
                discussion discloses the amount of data needed to be collected,
                which person(s) will be authorized to access information, and
                the possible risks involved.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Client meeting room"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Employee NDA Subsection with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-700 mt-4 mb-3">
                NDA with Employees
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We also sign a Non Disclosure Agreement (NDA) with each of our
                employees at hire. We clearly state that failing to uphold the
                agreement is ground for legal action and termination. We
                regularly update employees about the importance of data
                protection and provide updated practices to ensure company
                standards are not compromised.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Employee workspace"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
