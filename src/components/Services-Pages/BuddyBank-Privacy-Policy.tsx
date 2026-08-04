import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Users, FileText, AlertCircle, CheckCircle, Mail, Phone } from 'lucide-react';

const BuddyBankPrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(element.getAttribute('data-section') || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationItems = [
    { id: 'introduction', title: 'Introduction', icon: <FileText size={16} /> },
    { id: 'information-collection', title: 'Information We Collect', icon: <Eye size={16} /> },
    { id: 'how-we-use', title: 'How We Use Information', icon: <Users size={16} /> },
    { id: 'data-sharing', title: 'Data Sharing', icon: <Shield size={16} /> },
    { id: 'security', title: 'Security Measures', icon: <Lock size={16} /> },
    { id: 'your-rights', title: 'Your Rights', icon: <CheckCircle size={16} /> },
    { id: 'contact', title: 'Contact Us', icon: <Mail size={16} /> },
  ];

  return (
    <>
      <Helmet>
        <title>Buddy Bank Privacy Policy | Karmadude IT Solutions</title>
        <meta name="description" content="Comprehensive privacy policy for Buddy Bank mobile application - protecting your financial data and personal information." />
        <meta name="keywords" content="Buddy Bank, privacy policy, financial app, data protection, mobile banking, security" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 py-16">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/20 rounded-full backdrop-blur-sm">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Buddy Bank Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy and security are our top priorities. Learn how we protect and manage your financial data.
            </p>
            <div className="mt-6 text-sm text-blue-200">
              Last Updated: November 18, 2025
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                        activeSection === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-12">
              {/* Introduction */}
              <section id="introduction" data-section="introduction" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Introduction</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Welcome to <span className="text-blue-400 font-semibold">Buddy Bank</span>. We are committed to protecting your privacy and ensuring the security of your personal and financial information. This Privacy Policy explains how Buddy Bank collects, uses, shares, and protects your information when you use our mobile application.
                  </p>
                  <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-blue-200 mb-0">
                      By using Buddy Bank, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-collection" data-section="information-collection" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Information We Collect</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Full name and email address</li>
                      <li>• Phone number and profile picture</li>
                      <li>• Date of birth (if provided)</li>
                      <li>• User role (Member/Admin)</li>
                      <li>• Group membership information</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-400" />
                      Financial Information
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Loan applications and amounts</li>
                      <li>• EMI payment records</li>
                      <li>• Contribution amounts</li>
                      <li>• Account balances</li>
                      <li>• Transaction history</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-yellow-300 font-semibold mb-2">Automatically Collected Data</h4>
                      <p className="text-yellow-200 text-sm">
                        We automatically collect device information, usage patterns, and technical data to improve app performance and security.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="how-we-use" data-section="how-we-use" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">How We Use Your Information</h2>
                </div>
                
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-lg border border-blue-600/30">
                      <h3 className="text-lg font-semibold text-blue-300 mb-3">Service Provision</h3>
                      <p className="text-gray-300 text-sm">
                        Process loans, manage accounts, calculate EMIs, and facilitate group transactions.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-lg border border-green-600/30">
                      <h3 className="text-lg font-semibold text-green-300 mb-3">Security & Fraud Prevention</h3>
                      <p className="text-gray-300 text-sm">
                        Monitor suspicious activities, protect accounts, and maintain audit trails.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Uses</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-300">
                        <strong className="text-white">App Functionality:</strong> Authentication, user sessions, member communication
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-white">Improvement:</strong> Usage analysis, bug fixes, feature development
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-white">Legal Compliance:</strong> Regulatory requirements, legal requests
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" data-section="data-sharing" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">How We Share Your Information</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      What We Share Within Your Group
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-white">With Group Members:</strong>
                        <ul className="text-gray-300 mt-2 space-y-1">
                          <li>• Your name and profile</li>
                          <li>• Loan applications status</li>
                          <li>• Payment records</li>
                          <li>• Contribution history</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-white">With Group Admins:</strong>
                        <ul className="text-gray-300 mt-2 space-y-1">
                          <li>• All member information</li>
                          <li>• Complete transaction history</li>
                          <li>• Administrative actions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      What We DON'T Do
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                      <div>
                        <p>❌ Sell your personal information</p>
                        <p>❌ Share data with advertisers</p>
                        <p>❌ Use data for marketing</p>
                      </div>
                      <div>
                        <p>❌ Share outside your group</p>
                        <p>❌ Provide data to brokers</p>
                        <p>❌ Unauthorized third-party access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security Measures */}
              <section id="security" data-section="security" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Security & Data Protection</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                      <h3 className="text-blue-300 font-semibold mb-2">Encryption</h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• SHA-256 password hashing</li>
                        <li>• HTTPS/SSL data transmission</li>
                        <li>• Database encryption at rest</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                      <h3 className="text-green-300 font-semibold mb-2">Access Controls</h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Role-based permissions</li>
                        <li>• Admin verification codes</li>
                        <li>• Session management</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-4">
                      <h3 className="text-purple-300 font-semibold mb-2">Monitoring</h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Regular security audits</li>
                        <li>• Intrusion detection</li>
                        <li>• Suspicious activity alerts</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-4">
                      <h3 className="text-orange-300 font-semibold mb-2">Data Retention</h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Active accounts: Indefinite</li>
                        <li>• Deleted accounts: 30 days</li>
                        <li>• Transaction records: 7 years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="your-rights" data-section="your-rights" className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Your Privacy Rights</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-lg border border-blue-600/30">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-blue-300 font-semibold mb-2">Access Your Data</h3>
                    <p className="text-gray-300 text-sm">View and download all personal information we hold about you.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-6 rounded-lg border border-green-600/30">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-green-300 font-semibold mb-2">Correct Information</h3>
                    <p className="text-gray-300 text-sm">Update your profile and correct any inaccurate information.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-6 rounded-lg border border-red-600/30">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mb-3">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-red-300 font-semibold mb-2">Delete Your Data</h3>
                    <p className="text-gray-300 text-sm">Request account deletion and removal of personal information.</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                  <h3 className="text-blue-300 font-semibold mb-2">Additional Rights (GDPR & CCPA)</h3>
                  <p className="text-gray-300 text-sm">
                    European and California residents have additional rights including data portability, 
                    right to object, and protection against automated decision-making.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" data-section="contact" className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Privacy Inquiries</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span>karmadudeenterprise@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="w-5 h-5 text-green-400" />
                        <span>+91 74358 22022</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                      Response time: Within 48 hours
                    </p>
                  </div>
                  
                </div>
                
                <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Important Notice</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    This Privacy Policy is effective as of <strong className="text-blue-300">November 18, 2025</strong>. 
                    We may update this policy periodically. Continued use of Buddy Bank after changes indicates 
                    acceptance of the updated policy. For the most current version, please check within the app.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BuddyBankPrivacyPolicy;