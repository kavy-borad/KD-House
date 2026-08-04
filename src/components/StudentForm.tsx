import React, { useState, useEffect } from "react";
import logo from "../assets/logo/newlogo1.webp";
import { api } from "../lib/apiClient";

const Studentform: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNo: "",
    emailId: "",
    currentAddress: "",
    education: "",
    currentSemester: "",
    boardUniversity: "",
    courseInterestedIn: "",
    preferredBatchTiming: "",
    durationOfInternship: "",
    learningMode: "",
    howDidYouHearAboutUs: "",
    // additionalNotes: "",
    referredBy: "",
    declaration: false,
  });

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateFields, setDuplicateFields] = useState<string[]>([]);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    // Clear duplicate errors when user modifies conflicting fields
    if (showDuplicateError && (name === "emailId" || name === "phoneNo")) {
      const fieldName = name === "emailId" ? "email" : "phone";
      if (duplicateFields.includes(fieldName)) {
        setShowDuplicateError(false);
        setDuplicateFields([]);
        setSubmitStatus(null);
      }
    }

    // For phone field, only allow digits
    let processedValue = name === "phoneNo" ? value.replace(/\D/g, "") : value;

    // For currentSemester field, only allow digits and limit to 2 characters
    if (name === "currentSemester") {
      processedValue = value.replace(/\D/g, "").slice(0, 2);
    }

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: processedValue,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setShowDuplicateError(false);
    setDuplicateFields([]);
    setFormErrors({});

    // Validate fields before submission
    const errors: Record<string, string> = {};
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;

    if (!nameRegex.test(formData.fullName)) {
      errors.fullName =
        "Please enter a valid full name (minimum 3 characters, alphabets only).";
    }

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        errors.dateOfBirth = "Date of birth cannot be in the future.";
      } else {
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 15 || age > 60) {
          errors.dateOfBirth = "Age must be between 15 and 60 years.";
        }
      }
    }

    if (formData.phoneNo.length !== 10) {
      errors.phoneNo = "Phone number must be exactly 10 digits.";
    }

    if (formData.currentAddress.trim().length < 10) {
      errors.currentAddress =
        "Please enter a detailed address (min 10 characters).";
    }

    if (formData.education.trim().length < 2) {
      errors.education = "Please enter valid education details.";
    }

    if (formData.boardUniversity.trim().length < 2) {
      errors.boardUniversity = "Please enter a valid board or university name.";
    }

    if (formData.courseInterestedIn.trim().length < 2) {
      errors.courseInterestedIn =
        "Please specify a valid technology or course.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus("Please correct the errors before submitting the form.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await api.studentInquiries.create({
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        phone_no: formData.phoneNo,
        email_id: formData.emailId,
        current_address: formData.currentAddress,
        education: formData.education,
        current_semester: formData.currentSemester,
        board_university: formData.boardUniversity,
        course_interested_in: formData.courseInterestedIn,
        preferred_batch_timing: formData.preferredBatchTiming,
        duration_of_internship: formData.durationOfInternship,
        learning_mode: formData.learningMode,
        how_did_you_hear_about_us: formData.howDidYouHearAboutUs,
        referred_by: formData.referredBy,
        declaration: formData.declaration,
      });

      if (!result.success) {
        // Check if the API returns duplicate field information
        if (result.duplicate_fields && result.duplicate_fields.length > 0) {
          setDuplicateFields(result.duplicate_fields);
          setShowDuplicateError(true);
          setSubmitStatus(
            "A record with this information already exists. Please check the highlighted fields.",
          );
          setIsSubmitting(false);
          return;
        }
        throw new Error(result.message || "Failed to submit form");
      }

      console.log("Form submitted successfully:", result);
      setSubmitStatus("Form submitted successfully!");
      setShowPopup(true); // Show popup on successful submission
      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phoneNo: "",
        emailId: "",
        currentAddress: "",
        education: "",
        currentSemester: "",
        boardUniversity: "",
        courseInterestedIn: "",
        preferredBatchTiming: "",
        durationOfInternship: "",
        learningMode: "",
        howDidYouHearAboutUs: "",
        referredBy: "",
        declaration: false,
      });
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setSubmitStatus("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSubmitStatus(null); // Clear submit status when closing popup
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  // Helper function to check if a field has duplicate error
  const hasFieldError = (fieldName: string) => {
    return showDuplicateError && duplicateFields.includes(fieldName);
  };

  // Helper function to get field error class
  const getFieldErrorClass = (fieldName: string) => {
    return hasFieldError(fieldName)
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md p-4 mb-6 rounded-lg">
          <div className="flex items-center mb-3 sm:mb-0">
            <img
              src={logo}
              alt="Company Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="text-blue-600 font-bold flex items-center">
            <i className="fas fa-globe mr-2"></i>
            <a
              href="https://karmadude.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
            >
              https://karmadude.in/
            </a>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-3">
              <i className="fas fa-user-graduate text-4xl text-blue-600"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              STUDENT INQUIRY FORM
            </h1>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          {submitStatus && !showPopup && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.includes("Error") || showDuplicateError
                  ? "bg-red-50 border border-red-200 text-red-700"
                  : "bg-green-50 border border-green-200 text-green-700"
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`fas ${showDuplicateError ? "fa-exclamation-triangle" : "fa-check-circle"} mr-2`}
                ></i>
                {submitStatus}
              </div>
              {showDuplicateError && (
                <div className="mt-2 text-sm">
                  <p className="font-bold">Conflicting fields:</p>
                  <ul className="list-disc list-inside mt-1">
                    {duplicateFields.includes("email") && (
                      <li>Email address is already registered</li>
                    )}
                    {duplicateFields.includes("phone") && (
                      <li>Phone number is already registered</li>
                    )}
                  </ul>
                  <p className="mt-2 text-red-600">
                    Please use different contact information or contact support
                    if this is an error.
                  </p>
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div className="mb-8">
              <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                <i className="fas fa-id-card text-blue-600 mr-2"></i>
                PERSONAL DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.dateOfBirth ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                  {formErrors.dateOfBirth && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.dateOfBirth}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="emailId"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${getFieldErrorClass("email")}`}
                    required
                  />
                  {hasFieldError("email") && (
                    <p className="mt-1 text-sm text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      This email address is already registered
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="phoneNo"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Phone No <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${hasFieldError("phone") || formErrors.phoneNo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`}
                    required
                    minLength={10}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                  />
                  {hasFieldError("phone") && (
                    <p className="mt-1 text-sm text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      This phone number is already registered
                    </p>
                  )}
                  {!hasFieldError("phone") && formErrors.phoneNo && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.phoneNo}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="currentAddress"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Current Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="currentAddress"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.currentAddress ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  ></textarea>
                  {formErrors.currentAddress && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.currentAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Educational Details Section */}
            <div className="mb-8">
              <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                <i className="fas fa-book-reader text-blue-600 mr-2"></i>
                EDUCATIONAL DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <label
                    htmlFor="education"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Education <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.education ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                  {formErrors.education && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.education}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="currentSemester"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Current Semester <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="currentSemester"
                    name="currentSemester"
                    value={formData.currentSemester}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                    required
                    min={1}
                    max={99}
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="boardUniversity"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Board/University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="boardUniversity"
                    name="boardUniversity"
                    value={formData.boardUniversity}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.boardUniversity ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                  {formErrors.boardUniversity && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.boardUniversity}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="courseInterestedIn"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Technology Internship In{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="courseInterestedIn"
                    name="courseInterestedIn"
                    value={formData.courseInterestedIn}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 ${formErrors.courseInterestedIn ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                  {formErrors.courseInterestedIn && (
                    <p className="mt-1 text-xs text-red-600">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {formErrors.courseInterestedIn}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Program Preferences Section */}
            <div className="mb-8">
              <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                <i className="fas fa-clock text-blue-600 mr-2"></i>
                PROGRAM PREFERENCES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preferred Batch Timing{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="morning"
                        name="preferredBatchTiming"
                        value="Morning"
                        checked={formData.preferredBatchTiming === "Morning"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <label
                        htmlFor="morning"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Morning
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="noon"
                        name="preferredBatchTiming"
                        value="Noon"
                        checked={formData.preferredBatchTiming === "Noon"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="noon"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Noon
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="evening"
                        name="preferredBatchTiming"
                        value="Evening"
                        checked={formData.preferredBatchTiming === "Evening"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="evening"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Evening
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Duration of Internship{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="1month"
                        name="durationOfInternship"
                        value="1 Month"
                        checked={formData.durationOfInternship === "1 Month"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <label
                        htmlFor="1month"
                        className="ml-2 text-sm text-gray-700"
                      >
                        1 Month
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="3months"
                        name="durationOfInternship"
                        value="3 Months"
                        checked={formData.durationOfInternship === "3 Months"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="3months"
                        className="ml-2 text-sm text-gray-700"
                      >
                        3 Months
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="6months"
                        name="durationOfInternship"
                        value="6 Months"
                        checked={formData.durationOfInternship === "6 Months"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="6months"
                        className="ml-2 text-sm text-gray-700"
                      >
                        6 Months
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Learning Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="online"
                        name="learningMode"
                        value="Online"
                        checked={formData.learningMode === "Online"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <label
                        htmlFor="online"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Online
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="office"
                        name="learningMode"
                        value="office"
                        checked={formData.learningMode === "office"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor="office"
                        className="ml-2 text-sm text-gray-700"
                      >
                        office
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Information Section */}
            <div className="mb-8">
              <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                ADDITIONAL INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="col-span-1">
                  <label
                    htmlFor="howDidYouHearAboutUs"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    How Did You Hear About Us?
                  </label>
                  <input
                    type="text"
                    id="howDidYouHearAboutUs"
                    name="howDidYouHearAboutUs"
                    value={formData.howDidYouHearAboutUs}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="referredBy"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Referred By
                  </label>
                  <input
                    type="text"
                    id="referredBy"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                  />
                </div>
                {/* <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Additional Notes (if any)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                  ></textarea>
                </div> */}
              </div>
            </div>
            {/* Declaration */}
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="declaration"
                    name="declaration"
                    type="checkbox"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="declaration"
                    className="font-bold text-gray-700"
                  >
                    Declaration <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-600 mt-1">
                    I hereby declare that all the information provided by me in
                    this application is true and correct to the best of my
                    knowledge and belief. I understand that any
                    misrepresentation or false information provided may lead to
                    rejection of my application or termination of my enrollment.
                  </p>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className="text-center mt-8 pb-16 sm:pb-28">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-3 font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 whitespace-nowrap flex items-center justify-center mx-auto ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
              >
                <i
                  className={`fas ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} mr-2`}
                ></i>
                {isSubmitting ? "Checking for duplicates..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Thank you for submitting the form!
                </h2>
                <div className="text-center">
                  <button
                    onClick={closePopup}
                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Studentform;
