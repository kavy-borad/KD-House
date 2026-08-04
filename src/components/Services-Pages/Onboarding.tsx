import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/apiClient";

// Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  message: string;
  onClose: () => void;
}> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-2xl transform transition-all duration-300 scale-100 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">
          Success!
        </h2>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6">
          {message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Onboarding: React.FC = () => {
  // State for current step and form data
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    instagramHandle: "",
    email: "",
    contactName: "",
    contactRole: "",
    phone: "",
    businessDescription: "",
    targetAudience: "",
    brandPersonality: {
      friendly: false,
      bold: false,
      professional: false,
      casual: false,
      luxurious: false,
      other: false,
    },
    otherPersonality: "",
    toneOfVoice: "",
    hasExistingContent: false,
    contentFiles: [] as File[],
    admiredBrands: "",
    contentToAvoid: "",
    goals: {
      growFollowers: false,
      generateLeads: false,
      increaseEngagement: false,
      driveWebsiteTraffic: false,
      boostSales: false,
    },
    leadMagnetDescription: "",
    leadDestination: "",
    additionalGoals: "",
    instagramAccessMethod: "login",
    instagramUsername: "",
    instagramPassword: "",
    integrations: {
      mailchimp: false,
      calendly: false,
      other: false,
    },
    otherIntegration: "",
    additionalInfo: "",
    termsAgreed: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Auto-redirect after modal is shown
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  // Debug currentStep changes
  useEffect(() => {
    console.log("Current Step:", currentStep);
  }, [currentStep]);

  // Handle text input, textarea, and select changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    // For phone field, only allow digits
    const processedValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // Handle checkbox changes for nested objects
  const handleCheckboxChange = (category: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: !(prev[category as keyof typeof prev] as any)[field],
      },
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (e.target.files) {
      if (fieldName === "contentFiles") {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: Array.from(e.target.files || []),
        }));
      }
    }
  };

  // Handle drag-and-drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, fieldName: string) => {
    e.preventDefault();
    if (e.dataTransfer.files && fieldName === "contentFiles") {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: Array.from(e.dataTransfer.files),
      }));
    }
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => {
        console.log("Moving to step:", prev + 1);
        return prev + 1;
      });
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => {
        console.log("Moving to step:", prev - 1);
        return prev - 1;
      });
      window.scrollTo(0, 0);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Client-side validation
    if (
      !formData.businessName ||
      !formData.contactName ||
      !formData.phone ||
      !formData.businessDescription ||
      !formData.targetAudience ||
      !formData.termsAgreed
    ) {
      setError("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Starting submission...");

      // Prepare submission data
      const submissionData = {
        business_name: formData.businessName,
        website: formData.website,
        instagram_handle: formData.instagramHandle,
        email: formData.email,
        contact_name: formData.contactName,
        contact_role: formData.contactRole,
        phone: formData.phone,
        business_description: formData.businessDescription,
        target_audience: formData.targetAudience,
        brand_personality: formData.brandPersonality,
        other_personality: formData.otherPersonality,
        tone_of_voice: formData.toneOfVoice,
        has_existing_content: formData.hasExistingContent,
        admired_brands: formData.admiredBrands,
        content_to_avoid: formData.contentToAvoid,
        goals: formData.goals,
        lead_magnet_description: formData.leadMagnetDescription,
        lead_destination: formData.leadDestination,
        additional_goals: formData.additionalGoals,
        instagram_access_method: formData.instagramAccessMethod,
        instagram_username:
          formData.instagramAccessMethod === "login"
            ? formData.instagramUsername
            : null,
        instagram_password:
          formData.instagramAccessMethod === "login"
            ? formData.instagramPassword
            : null,
        integrations: formData.integrations,
        other_integration: formData.otherIntegration,
        additional_info: formData.additionalInfo,
        terms_agreed: formData.termsAgreed,
      };

      // Submit to API
      console.log("Submitting to API:", submissionData);
      const result = await api.onboarding.create(submissionData);

      if (!result.success) {
        throw new Error(result.message || "Failed to save submission");
      }

      // Show modal
      setShowModal(true);
      setFormData({
        businessName: "",
        website: "",
        instagramHandle: "",
        email: "",
        contactName: "",
        contactRole: "",
        phone: "",
        businessDescription: "",
        targetAudience: "",
        brandPersonality: {
          friendly: false,
          bold: false,
          professional: false,
          casual: false,
          luxurious: false,
          other: false,
        },
        otherPersonality: "",
        toneOfVoice: "",
        hasExistingContent: false,
        contentFiles: [],
        admiredBrands: "",
        contentToAvoid: "",
        goals: {
          growFollowers: false,
          generateLeads: false,
          increaseEngagement: false,
          driveWebsiteTraffic: false,
          boostSales: false,
        },
        leadMagnetDescription: "",
        leadDestination: "",
        additionalGoals: "",
        instagramAccessMethod: "login",
        instagramUsername: "",
        instagramPassword: "",
        integrations: {
          mailchimp: false,
          calendly: false,
          other: false,
        },
        otherIntegration: "",
        additionalInfo: "",
        termsAgreed: false,
      });
      setCurrentStep(1);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render tooltip with text fallback
  const renderTooltip = (text: string) => (
    <div className="group relative inline-block">
      <span className="text-gray-900 ml-2 cursor-pointer">?</span>
      <div className="absolute z-10 w-48 sm:w-64 p-3 text-sm bg-gray-800 text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
        {text}
        <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Client Onboarding Form
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-900">
            Help us understand your business better to create an effective
            Instagram strategy.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={showModal}
          message="Form submitted successfully! Thank you for your submission."
          onClose={() => {
            setShowModal(false);
            navigate("/");
          }}
        />

        {/* Progress Bar */}
        <div className="mb-8 sm:mb-10 bg-white py-4 px-3 sm:px-6 rounded-xl shadow-sm z-10">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center justify-start min-w-0"
              >
                <div
                  className={`w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all ${
                    currentStep === step
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : currentStep > step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                <div
                  className={`text-[10px] sm:text-xs mt-1.5 font-bold text-center leading-tight truncate max-w-full ${
                    currentStep === step ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step === 1 && "Business Info"}
                  {step === 2 && "Brand & Voice"}
                  {step === 3 && "Content"}
                  {step === 4 && "Goals"}
                  {step === 5 && "Access"}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Business & Contact Info */}
          {currentStep === 1 && (
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 transition-all duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                1. Business & Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                      formData.businessName
                        ? "border-gray-300"
                        : "border-red-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="instagramHandle"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Instagram Handle
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                      @
                    </span>
                    <input
                      type="text"
                      id="instagramHandle"
                      name="instagramHandle"
                      value={formData.instagramHandle}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Primary Contact Person{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                      formData.contactName
                        ? "border-gray-300"
                        : "border-red-500"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactRole"
                    className="block text-sm font-bold text-gray-900 mb-1"
                  >
                    Contact Role/Position
                  </label>
                  <input
                    type="text"
                    id="contactRole"
                    name="contactRole"
                    value={formData.contactRole}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Phone/WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                    formData.phone ? "border-gray-300" : "border-red-500"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Step 2: Brand & Voice */}
          {currentStep === 2 && (
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 transition-all duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                2. Brand & Voice
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="businessDescription"
                  className="block text-sm font-bold text-gray-900 mb-1 flex items-center"
                >
                  One-sentence business description{" "}
                  <span className="text-red-500">*</span>
                  {renderTooltip(
                    "Describe your business in a concise sentence that captures what you do and who you serve.",
                  )}
                </label>
                <textarea
                  id="businessDescription"
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  maxLength={150}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                    formData.businessDescription
                      ? "border-gray-300"
                      : "border-red-500"
                  }`}
                ></textarea>
                <div className="text-xs text-gray-900 mt-1 text-right">
                  {formData.businessDescription.length}/150 characters
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="targetAudience"
                  className="block text-sm font-bold text-gray-900 mb-1 flex items-center"
                >
                  Target Audience <span className="text-red-500">*</span>
                  {renderTooltip(
                    "Describe the demographics, interests, and behaviors of your ideal customers.",
                  )}
                </label>
                <textarea
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                    formData.targetAudience
                      ? "border-gray-300"
                      : "border-red-500"
                  }`}
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Brand Personality (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "friendly",
                    "bold",
                    "professional",
                    "casual",
                    "luxurious",
                  ].map((trait) => (
                    <div key={trait} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`personality-${trait}`}
                        checked={(formData.brandPersonality as any)[trait]}
                        onChange={() =>
                          handleCheckboxChange("brandPersonality", trait)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`personality-${trait}`}
                        className="ml-2 text-sm text-gray-900 capitalize"
                      >
                        {trait}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="personality-other"
                      checked={(formData.brandPersonality as any).other}
                      onChange={() =>
                        handleCheckboxChange("brandPersonality", "other")
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="personality-other"
                      className="ml-2 text-sm text-gray-900"
                    >
                      Other
                    </label>
                  </div>
                </div>
                {(formData.brandPersonality as any).other && (
                  <input
                    type="text"
                    name="otherPersonality"
                    value={formData.otherPersonality}
                    onChange={handleInputChange}
                    placeholder="Please specify"
                    className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="toneOfVoice"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Preferred Tone of Voice
                </label>
                <select
                  id="toneOfVoice"
                  name="toneOfVoice"
                  value={formData.toneOfVoice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="">Select a tone</option>
                  <option value="conversational">Conversational</option>
                  <option value="formal">Formal</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="educational">Educational</option>
                  <option value="authoritative">Authoritative</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Content & Assets */}
          {currentStep === 3 && (
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 transition-all duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                3. Content & Assets
              </h2>

              {/* <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Do you have Fred content for your Instagram content?
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleToggleChange("hasExistingContent", true)}
                      className={`px-4 py-2 rounded-md whitespace-nowrap text-sm sm:text-base ${
                        formData.hasExistingContent
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleChange("hasExistingContent", false)}
                      className={`px-4 py-2 rounded-md whitespace-nowrap text-sm sm:text-base ${
                        !formData.hasExistingContent
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div> */}

              {formData.hasExistingContent && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Upload your content assets
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 sm:p-6 text-center hover:border-blue-500 transition-colors duration-200"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "contentFiles")}
                  >
                    <input
                      type="file"
                      id="contentFiles"
                      onChange={(e) => handleFileChange(e, "contentFiles")}
                      className="hidden"
                      accept="image/*,video/*"
                      multiple
                    />
                    <label htmlFor="contentFiles" className="cursor-pointer">
                      <p className="text-sm text-gray-900">
                        Drag and drop your photos and videos here, or{" "}
                        <span className="text-blue-500">browse</span>
                      </p>
                      <p className="text-xs text-gray-900 mt-1">
                        Supports: JPG, PNG, GIF, MP4, MOV (Max 50MB per file)
                      </p>
                    </label>
                  </div>

                  {formData.contentFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        Uploaded files ({formData.contentFiles.length})
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {(formData.contentFiles as File[]).map(
                          (file, index) => (
                            <div key={index} className="relative group">
                              <div className="h-20 sm:h-24 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                                {file.type.startsWith("image/") ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="text-center">
                                    <span className="text-gray-900 text-lg sm:text-xl">
                                      Video
                                    </span>
                                    <p className="text-xs text-gray-900 mt-1 truncate px-2">
                                      {file.name}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newFiles = [...formData.contentFiles];
                                  newFiles.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    contentFiles: newFiles,
                                  });
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                X
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-6">
                <label
                  htmlFor="admiredBrands"
                  className="block text-sm font-bold text-gray-900 mb-1 flex items-center"
                >
                  Brands or Instagram accounts you admire
                  {renderTooltip(
                    "Share accounts that inspire you or have a style you like.",
                  )}
                </label>
                <textarea
                  id="admiredBrands"
                  name="admiredBrands"
                  value={formData.admiredBrands}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="@example1, @example2, etc."
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="contentToAvoid"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Content types or themes you want to avoid
                </label>
                <textarea
                  id="contentToAvoid"
                  name="contentToAvoid"
                  value={formData.contentToAvoid}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="E.g., overly promotional content, certain colors, specific themes..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Offers */}
          {currentStep === 4 && (
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 transition-all duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                4. Goals & Offers
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  What are your Instagram goals? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "growFollowers", label: "Grow followers" },
                    { id: "generateLeads", label: "Generate leads" },
                    { id: "increaseEngagement", label: "Increase engagement" },
                    {
                      id: "driveWebsiteTraffic",
                      label: "Drive website traffic",
                    },
                    { id: "boostSales", label: "Boost sales" },
                  ].map((goal) => (
                    <div key={goal.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`goal-${goal.id}`}
                        checked={(formData.goals as any)[goal.id]}
                        onChange={() => handleCheckboxChange("goals", goal.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`goal-${goal.id}`}
                        className="ml-2 text-sm text-gray-900"
                      >
                        {goal.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="leadMagnetDescription"
                  className="block text-sm font-bold text-gray-900 mb-1 flex items-center"
                >
                  Lead Magnets or Offers
                  {renderTooltip(
                    "Describe any free resources, discounts, or special offers you want to promote.",
                  )}
                </label>
                <textarea
                  id="leadMagnetDescription"
                  name="leadMagnetDescription"
                  value={formData.leadMagnetDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="E.g., free guide, discount code, consultation offer..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="leadDestination"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Where should leads be directed?
                </label>
                <input
                  type="url"
                  id="leadDestination"
                  name="leadDestination"
                  value={formData.leadDestination}
                  onChange={handleInputChange}
                  placeholder="https://example.com/landing-page"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="additionalGoals"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Additional goals or objectives
                </label>
                <textarea
                  id="additionalGoals"
                  name="additionalGoals"
                  value={formData.additionalGoals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Any other specific outcomes you're looking to achieve..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 5: Access & Permissions */}
          {currentStep === 5 && (
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 transition-all duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                5. Access & Permissions
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  How would you prefer to provide Instagram access?
                </label>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="access-login"
                      name="instagramAccessMethod"
                      value="login"
                      checked={formData.instagramAccessMethod === "login"}
                      onChange={handleInputChange}
                      className="h-4 w-4 mt-1 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="access-login"
                      className="ml-2 text-sm text-gray-900"
                    >
                      <div className="font-bold">Provide login credentials</div>
                      <p className="text-gray-900 text-xs mt-1">
                        Your credentials will be stored securely and only used
                        for managing your Instagram account.
                      </p>
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="access-manager"
                      name="instagramAccessMethod"
                      value="manager"
                      checked={formData.instagramAccessMethod === "manager"}
                      onChange={handleInputChange}
                      className="h-4 w-4 mt-1 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="access-manager"
                      className="ml-2 text-sm text-gray-900"
                    >
                      <div className="font-bold">
                        Add us to your Meta Business Manager
                      </div>
                      <p className="text-gray-900 text-xs mt-1">
                        We'll provide instructions on how to add our agency to
                        your Meta Business Manager.
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {formData.instagramAccessMethod === "login" && (
                <div className="mb-6 bg-gray-50 p-4 rounded-md">
                  <div className="mb-4">
                    <label
                      htmlFor="instagramUsername"
                      className="block text-sm font-bold text-gray-900 mb-1"
                    >
                      Instagram Username
                    </label>
                    <input
                      type="text"
                      id="instagramUsername"
                      name="instagramUsername"
                      value={formData.instagramUsername}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instagramPassword"
                      className="block text-sm font-bold text-gray-900 mb-1"
                    >
                      Instagram Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="instagramPassword"
                        name="instagramPassword"
                        value={formData.instagramPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-900 mt-1">
                      Your credentials are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Do you use any tools we should integrate with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: "mailchimp", label: "Mailchimp" },
                    { id: "calendly", label: "Calendly" },
                  ].map((tool) => (
                    <div key={tool.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`tool-${tool.id}`}
                        checked={(formData.integrations as any)[tool.id]}
                        onChange={() =>
                          handleCheckboxChange("integrations", tool.id)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`tool-${tool.id}`}
                        className="ml-2 text-sm text-gray-900"
                      >
                        {tool.label}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tool-other"
                      checked={(formData.integrations as any).other}
                      onChange={() =>
                        handleCheckboxChange("integrations", "other")
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="tool-other"
                      className="ml-2 text-sm text-gray-900"
                    >
                      Other
                    </label>
                  </div>
                </div>

                {(formData.integrations as any).other && (
                  <input
                    type="text"
                    name="otherIntegration"
                    value={formData.otherIntegration}
                    onChange={handleInputChange}
                    placeholder="Please specify"
                    className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-bold text-gray-900 mb-1"
                >
                  Any additional information we should know?
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Share any other details that might be helpful for us to know..."
                ></textarea>
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        termsAgreed: !formData.termsAgreed,
                      })
                    }
                    className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="termsAgreed"
                    className="ml-2 text-sm text-gray-900"
                  >
                    I agree to the{" "}
                    <Link
                      to="/Privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    . I understand that my information will be used as
                    described.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for invalid steps */}
          {![1, 2, 3, 4, 5].includes(currentStep) && (
            <div className="text-red-500 text-center text-sm sm:text-base">
              Error: Invalid step. Please refresh the page.
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 sm:flex sm:justify-between sm:gap-4">
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-4">
              <button
                type="button"
                onClick={prevStep}
                className={`w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  currentStep === 1 ? "invisible" : ""
                }`}
                disabled={isSubmitting}
              >
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.termsAgreed || isSubmitting}
                  className={`w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    formData.termsAgreed && !isSubmitting
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
