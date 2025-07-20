import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Layout from "../../components/layout"
import { Link } from "gatsby"
import "../../components/style/IndividualsLogin.css"
import ScrollToTopButton from "../../components/ScrollToTopButton"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Seo from "../../components/seo"
import Modal from "react-modal"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import Successfully from "../../Json/Successfully.json"
import Fail from "../../Json/fail.json"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../../context/LocalizationContext"
import CustomMultiSelect from "../../components/CustomMultiSelect"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  TextField,
} from "@mui/material"
import Hero from "../../components/Hero"
import { LocalizedLink } from "../../components/LocalizedLink"
const IndividualsLogin = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(false)
  const { locale } = useLocalization()
  const [isIdealTotal100, setIsIdealTotal100] = useState(false)
  const [isCurrentTotal100, setIsCurrentTotal100] = useState(false)
  const [maritalStatusNum, setMaritalStatusNum] = useState(5) // Default value
  const [retiredNum, setRetiredNum] = useState(5) // Default value

  const initialValues = {
    fullName: "",
    nationality: "",
    seniorPosition: "",
    familyRelationship: "",
    accountOwnership: "",
    gender: "",
    title: "",
    investorInformation: "",
    identityType: "",
    identityNumber: "",
    issueDate: "",
    expirationDate: "",
    placeOfIssue: "",
    dateOfBirth: "",
    maritalStatus: "",
    numberOfDependents: "",
    postalCode: "",
    poBox: "",
    country: "",
    city: "",
    mobileNumber: "",
    email: "",
    Building: "",
    Currency: "",
    telephoneNumber: "",
    Correspondence: "",
    correspondenceLanguage: "",
    communicationMethod: "",
    annualIncome: "",
    incomeSource: [], // Initialize as empty array
    netWorth: "",
    academicQualifications: "",
    employmentCategory: "",
    employerName: "",
    jobTitle: "",
    employerAddress: "",
    employerPhone: "",
    Sector: "",
    financialExperience: "",
    otherFinancialExperience: "",
    inheritorsAgentFaxNo: "",
    inheritorsAgentSignature: "",
    inheritorsAgentPlaceOfIssue: "",
    inheritorsAgentTelNo: "",
    inheritorsAgentIssueDate: "",
    inheritorsAgentIdType: "",
    inheritorsAgentId: "",
    inheritorsAgentExpiryDate: "",
    inheritorsAgentName: "",
    fatherGuardianMinor: "",
    inheritorsAgent: "",
    illiterateBlindWitness: "",
    veiledWomanId: "",
    incompetentLegalGuardian: "",
    investmentKnowledgeDescription: "",
    investmentYears: "",
    previousInvestments: "",
    professionalCertificates: "",
    loanToInvestedMoneyRatio: "",
    marginTransactions: "",
    securitiesTransactionsOutsideKingdom: "",
    countriesForSecuritiesTransactions: "",
    riskAppetite: "",
    capitalProtection: false,
    incomeGeneration: false,
    balanced: false,
    capitalGrowth: false,
    retirementSavings: false,
    projectFinancing: false,
    assetPurchase: false,
    investmentGoalsOther: "",
    saudiAssets: false,
    financialSituationInfo: "",
    selectedForeignCurrencies: "",
    foreignCurrencyAssets: false,
    expectedDuration: "",
    bankAccountOwnership: "",
    boardMembership: "",
    companyName: "",
    idealportfoliofortheclientdepositsMurabah: "",
    idealportfoliofortheclientdebitInstruments: "",
    idealportfoliofortheclientequity: "",
    idealportfoliofortheclientinvestmentFund: "",
    idealportfoliofortheclientrealEstate: "",
    idealportfoliofortheclientderivativesContracts: "",
    idealportfoliofortheclientalternativeInvestments: "",
    accountNumber: "",
    custodianName: "",
    custodianAddress: "",
    custodianCertificates: "",
    custodianDividends: "",
    clientName: "",
    investmentDesire: "",
    q1Answer: "",
    q2Answer: "",
    q3Answer: "",
    q4Answer: "",
    q5Answer: "",
    yearsEmployment: "",
    beneficialOwnership: "",
    bankName: "",
    ibanNumber: "",
    bankBranch: "",
    bankCity: "",
    OtherPartiesCertificates: "",
    OtherPartiesDividends: "",
    OtherPartiesSalesProceed: "",
    custodianCertificates: false,
    clientCertificates: false,
    custodianDividends: false,
    clientDividends: false,
    custodianSalesProceed: false,
    clientSalesProceed: false,
    idealportfoliofortheclientdepositsMurabah: 0,
    clientCurrentWalletdepositsMurabah: 0,
    idealportfoliofortheclientdebitInstruments: 0,
    clientCurrentWalletdebitInstruments: 0,
    idealportfoliofortheclientequity: 0,
    clientCurrentWalletequity: 0,
    idealportfoliofortheclientinvestmentFund: 0,
    clientCurrentWalletinvestmentFund: 0,
    idealportfoliofortheclientrealEstate: 0,
    clientCurrentWalletrealEstate: 0,
    idealportfoliofortheclientderivativesContracts: 0,
    clientCurrentWalletderivativesContracts: 0,
    idealportfoliofortheclientalternativeInvestments: 0,
    clientCurrentWalletalternativeInvestments: 0,
  }
  const errorIcon = (
    <div>
      <img src="/fail.svg" />
      <FormattedMessage id="error.required" />
    </div>
  )
  const [showPassword, setShowPassword] = useState(false)
  const validationSchema = Yup.object().shape({
    investorInformation: Yup.string().required(errorIcon),
    Building: Yup.string().required(errorIcon),
    incompetentLegalGuardian: Yup.string(),
    veiledWomanId: Yup.string(),
    illiterateBlindWitness: Yup.string(),
    inheritorsAgent: Yup.string(),
    fatherGuardianMinor: Yup.string(),
    inheritorsAgentName: Yup.string(),
    inheritorsAgentId: Yup.string(),
    
    inheritorsAgentIdType: Yup.string(),
    inheritorsAgentExpiryDate: Yup.string(),
    inheritorsAgentIssueDate: Yup.string(),
    inheritorsAgentTelNo: Yup.string(),
    inheritorsAgentPlaceOfIssue: Yup.string(), // Not required
    inheritorsAgentSignature: Yup.string().matches(
      /^[A-Za-z]+$/,
      "Only letters are allowed"
    ), // Not required
    inheritorsAgentFaxNo: Yup.string(), // Not required
    correspondenceLanguage: Yup.string().required(errorIcon),
    financialExperience: Yup.string().required(errorIcon),
    academicQualifications: Yup.string().when("Sector", {
      is: "Retired / متقاعد", // Check if Sector is "Retired"
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    Sector: Yup.string().required(errorIcon),
    employmentCategory: Yup.string().when("Sector", {
      is: "Retired / متقاعد", // Check if Sector is "Retired"
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    employerName: Yup.string().when("Sector", {
      is: "Retired / متقاعد",
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    jobTitle: Yup.string().when("Sector", {
      is: "Retired / متقاعد",
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    employerAddress: Yup.string().when("Sector", {
      is: "Retired / متقاعد",
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    yearsEmployment: Yup.number().when("Sector", {
      is: "Retired / متقاعد",
      then: () => Yup.number().nullable(), // Not required
      otherwise: () => Yup.number().required(errorIcon).positive().integer(),
    }),
    employerPhone: Yup.string().when("Sector", {
      is: "Retired / متقاعد",
      then: () => Yup.string(), // Not required
      otherwise: () => Yup.string().required(errorIcon),
    }),
    q1Answer: Yup.string().required(errorIcon),
    q2Answer: Yup.string().required(errorIcon),
    q3Answer: Yup.string().required(errorIcon),
    q4Answer: Yup.string().required(errorIcon),
    q5Answer: Yup.string().required(errorIcon),
    expectedDuration : Yup.string().required(errorIcon),
    familyRelationship:Yup.string().required(errorIcon),
    investmentDesire: Yup.string().required(errorIcon),
    clientName: Yup.string().required(errorIcon),
    bankAccountOwnership : Yup.string().required(errorIcon),
    accountNumber: Yup.string(),
    custodianName: Yup.string(),
    custodianAddress: Yup.string(),
    incomeSource: Yup.array()
      .min(0, "Please select at least one income source")
      .of(Yup.string()),
    // ... other fields

    communicationMethod: Yup.string().required(errorIcon),
    Correspondence: Yup.string().required(errorIcon),
    annualIncome: Yup.string().required(errorIcon),
    investmentKnowledgeDescription: Yup.string().required(errorIcon),
    investmentYears: Yup.string().required(errorIcon),
    previousInvestments: Yup.string().required(errorIcon),
    professionalCertificates: Yup.string().required(errorIcon),
    loanToInvestedMoneyRatio: Yup.string().required(errorIcon),
    marginTransactions: Yup.string().required(errorIcon),
    seniorPosition:Yup.string().required(errorIcon),
    securitiesTransactionsOutsideKingdom: Yup.string().required(errorIcon),
    countriesForSecuritiesTransactions: Yup.string().required(errorIcon),
    riskAppetite: Yup.string().required(errorIcon),
    netWorth: Yup.string().required(errorIcon),
    bankName: Yup.string().required(errorIcon),
    ibanNumber: Yup.string()
      .required("Please enter your IBAN number.") // Custom error message
      .matches(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{0,30}$/, "Invalid IBAN format."), // Custom message for format        bankBranch: Yup.string().required(errorIcon),
    bankCity: Yup.string().required(errorIcon),
    Currency: Yup.string().required(errorIcon),
    fullName: Yup.string().required(errorIcon),

    // ...  Your other validation rules

    inheritorsAgentExpiryDate: Yup.string(),
    inheritorsAgentIssueDate: Yup.string(),
    inheritorsAgentTelNo: Yup.string(),
    inheritorsAgentSignature: Yup.string(),
    nationality: Yup.string().required(errorIcon),
    gender: Yup.string().required(errorIcon),
    title: Yup.string().required(errorIcon),
    dateOfBirth: Yup.string().required(errorIcon),
    maritalStatus: Yup.string().required(errorIcon),
    accountOwnership :Yup.string().required(errorIcon),
    // Update the validation schema
    numberOfDependents: Yup.number().when(
      ["maritalStatus", "maritalStatusNum"],
      {
        is: (maritalStatus, maritalStatusNum) =>
          maritalStatus === "Single / أعزب" || maritalStatusNum === 0,
        then: () => Yup.number().nullable(), // Not required if maritalStatusNum is 0
        otherwise: () => Yup.number().required(errorIcon).positive().integer(),
      }
    ),
    identityType: Yup.string().required(errorIcon),
    identityNumber: Yup.string().required(errorIcon),
    expirationDate: Yup.string().required(errorIcon),
    placeOfIssue: Yup.string().required(errorIcon),
    postalCode: Yup.string().required(errorIcon),
    boardMembership: Yup.string().required(errorIcon),
    email: Yup.string()
      .email(<FormattedMessage id="error.invalidEmail" />)
      .required(errorIcon),
    mobileNumber: Yup.string().required(errorIcon),
    country: Yup.string().required(errorIcon),
    city: Yup.string().required(errorIcon),
    companyName: Yup.string().when("$boardMembership", {
      is: val => {
        //this will output admin
        return val === "Yes / نعم"
      },

      otherwise: s => s,
    }),
   
    investmentGoals: Yup.object().shape({
      capitalProtection: Yup.boolean(),
      incomeGeneration: Yup.boolean(),
      balanced: Yup.boolean(),
      capitalGrowth: Yup.boolean(),
      retirementSavings: Yup.boolean(),
      projectFinancing: Yup.boolean(),
      assetPurchase: Yup.boolean(),
      other: Yup.string(),
    }).test('atLeastOne', 'Select at least one investment goal', values => {
      // Temporarily disabled for testing - return true to skip validation
      return true;
      // return Object.keys(values).some(key => values[key] === true);
    }),
    beneficialOwnership: Yup.string().when("accountOwnership", {
      is: val => {
        return val === "No / لا"
      },
      // then: s => s.required("beneficialOwnership is required when account ownership is No"),
      otherwise: s => s,
    }),
    financialSituationInfo: Yup.string(),
    inheritorsAgentFaxNo: Yup.string(),
  })

  const handleSubmit = async (
    values,
    { setSubmitting, setTouched, resetForm }
  ) => {
    console.log("🔍 handleSubmit called - Individual form")
    console.log("📝 Form values:", values)
    console.log("⚙️ Form state - setSubmitting:", typeof setSubmitting, "setTouched:", typeof setTouched, "resetForm:", typeof resetForm)
    
    // Convert values to a string and prepare for FormData
    function convertValuesToString(obj) {
      const result = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === "incomeSource" && Array.isArray(obj[key])) {
            // Convert incomeSource array to string
            result[key] = obj[key].join(",")
          } else if (
            key === "investmentGoals" &&
            typeof obj[key] === "object"
          ) {
            result[key] = JSON.stringify(obj[key])
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = convertValuesToString(obj[key])
          } else {
            result[key] = String(obj[key])
          }
        }
      }

      // Add static values
      result.staticValue1 = "This is a static value"
      result.staticValue2 = "Another static value"

      return result
    }

    const convertedObject = convertValuesToString(values)
    console.log("🔄 Converted object:", convertedObject)

    // Create a FormData object
    const formData = new FormData()
    formData.append("data", JSON.stringify(convertedObject)) // Append converted object as a JSON string
    console.log("📦 FormData created with data:", JSON.stringify(convertedObject))

    // Append the file if it exists
    

    // Set touched fields if needed
    setTouched({
      investorInformation: true,
      telephoneNumber: true,
      Building: true,
      // Continue to set others as true...
    })

    try {
      console.log("🚀 Starting API request to:", "https://strong-nest-c09ad17fab.strapiapp.com/api/individuals-logins?populate=*")
      console.log("📋 Request headers:", {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer [TOKEN_HIDDEN]"
      })
      
      const response = await axios.post(
        "https://strong-nest-c09ad17fab.strapiapp.com/api/individuals-logins?populate=*",
        formData, // Send FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            Authorization:
              "Bearer 6bd6af85d32da95f631a89f06f68ed9c05b785a52197a8c6484b87b2fb402160414499b19ee179791552c19a9a0a515a6c68233149179b39e01180f2a8cefeeed9f905bbdc597101ad02d8f76f62d3e3bc709f9ffb7864f04d60540a5f3cf46f06e46c2b71a24e457a355d1fa0f8aec9850b0e17e8e21a5263de6e72b40e9e31 // Replace with your actual token
          },
        }
      )
      console.log("✅ API response received:", response.status, response.statusText)

      if (response.status === 200) {
        console.log("🎉 Form submission successful!")
        setFormSubmitted(true)
        resetForm()
      } else {
        console.log("⚠️ Unexpected response status:", response.status)
        setFormError(true)
      }
    } catch (error) {
      console.error("❌ Error during form submission:")
      console.error("Error details:", error.response ? error.response.data : error.message)
      console.error("Full error object:", error)
      setFormError(true)
    } finally {
      console.log("🏁 Form submission process completed, setting submitting to false")
      setSubmitting(false)
    }
  }
  const rows = [
    { id: "depositsMurabah", label: "Deposits/Murabah (ودائع ومرابحات)" },
    { id: "debitInstruments", label: "Debit Instruments (أدوات دين)" },
    { id: "equity", label: "Equity (أسهم)" },
    { id: "investmentFund", label: "Investment Fund (صناديق استثمارية)" },
    { id: "realEstate", label: "Real estate (عقارات)" },
    {
      id: "derivativesContracts",
      label: "Derivatives contracts (عقود مشتقات)",
    },
    {
      id: "alternativeInvestments",
      label: "Alternative Investments (استثمارات بديلة)",
    },
  ]
  const rows2 = [
    {
      id: "Certificates",
      label: "الشهادات Certificates",
    },
    {
      id: "Dividends",
      label: "حصص الأرباح أو أي دخل آخر Dividends or any other income",
    },
    {
      id: "SalesProceed",
      label: "حصيلة البيع/ Sales proceed",
    },
  ]

  const [q1Answer, setQ1Answer] = useState("")
  const [q2Answer, setQ2Answer] = useState("")
  const [q3Answer, setQ3Answer] = useState("")
  const [q4Answer, setQ4Answer] = useState("")
  const [q5Answer, setQ5Answer] = useState("")

  // Handle change for question 1
  const handleQ1Change = e => {
    setQ1Answer(e.target.value)
  }

  // Handle change for question 2
  const handleQ2Change = e => {
    setQ2Answer(e.target.value)
  }
  const handleQ3Change = e => {
    setQ3Answer(e.target.value)
  }
  const handleQ4Change = e => {
    setQ4Answer(e.target.value)
  }
  const handleQ5Change = e => {
    setQ5Answer(e.target.value)
  }

  const calculateTotalPoints = values => {
    let totalPoints = 0

    totalPoints += parseInt(values.q1Answer) || 0 // Fallback to 0 if undefined or NaN
    totalPoints += parseInt(values.q2Answer) || 0
    totalPoints += parseInt(values.q3Answer) || 0
    totalPoints += parseInt(values.q4Answer) || 0
    totalPoints += parseInt(values.q5Answer) || 0

    return totalPoints
  }
  rows.forEach(row => {
    initialValues[`clientCurrentWallet${row.id}`] = 0 // Ensure initial values
    initialValues[`idealportfoliofortheclient${row.id}`] = 0 // Ensure initial values
  })
  const calculateTotal = (fieldPrefix, values, currentId, newValue) => {
    return rows.reduce((total, row) => {
      if (row.id === currentId) {
        return total + newValue
      }
      const value = parseFloat(values[`${fieldPrefix}${row.id}`]) || 0
      return total + value
    }, 0)
  }
  const handleMaritalStatusChange = event => {
    const value = event.target.value

    // Check if the value contains the word "Single" (case insensitive)
    if (value.toLowerCase().includes("single")) {
      setMaritalStatusNum(0) // Set to 0 if "Single" is found
    } else {
      setMaritalStatusNum(5) // Set to a different value for other options
    }
  }
  const handleRetiredChange = event => {
    const value = event.target.value

    // Check if the value contains the word "Single" (case insensitive)
    if (value.toLowerCase().includes("retired")) {
      setRetiredNum(0) // Set to 0 if "Single" is found
    } else {
      setRetiredNum(5) // Set to a different value for other options
    }
  }
  return (
    <Layout>
      <Seo
        title={
          locale === "en"
            ? "Open an Individual Account - Customer Service - Itqan Capital"
            : "فتح حساب للأفراد - خدمة العملاء - إتقان كابيتال"
        }
        description={
          locale === "en"
            ? "Agree on the terms and conditions for opening an individual investment account with Itqan Capital. Fill out the form with the required information to start the opening process. Submit your application now and get your investment account."
            : "اتفق على شروط وأحكام فتح حساب استثماري للأفراد مع إتقان كابيتال. ملء النموذج بالمعلومات المطلوبة لبدء عملية الفتح. تقديم الطلب الآن واحصل على حسابك الاستثماري الخاص."
        }
      />{" "}
      <ScrollToTopButton />
      <Hero title={<FormattedMessage id="individualAccount.title" />} />
      <Modal
        isOpen={formSubmitted || formError}
        onRequestClose={() => {
          setFormSubmitted(false)
          setFormError(false)
        }}
      >
        {formSubmitted ? (
          <div className="Contact-successfuly">
            <button
              onClick={() => {
                setFormSubmitted(false)
              }}
            >
              <img src="/close.svg" alt="Close" />
            </button>
            <div className="Contact-successfuly-body">
              <Player
                autoplay
                loop
                src={Successfully}
                style={{ height: "200px", width: "200px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
              <h4>
                <FormattedMessage id="form.success" />
              </h4>
            </div>
          </div>
        ) : (
          <div className="Contact-error">
            <button
              onClick={() => {
                setFormError(false)
              }}
            >
              <img src="/close.svg" alt="Close" />
            </button>
            <div className="Contact-error-body">
              <Player
                autoplay
                loop
                src={Fail}
                style={{ height: "200px", width: "200px" }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
              <h4>
                <FormattedMessage id="form.error" />
              </h4>
            </div>
          </div>
        )}
      </Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, touched, errors, isSubmitting }) => {
          // Calculate totals
          const currentTotalSum = calculateTotal("clientCurrentWallet", values)
          const idealTotalSum = calculateTotal(
            "idealportfoliofortheclient",
            values
          )
          console.log(errors,"errors")
          return (
            <Form>
              <section className="individuals-login-sec">
                <div className="individuals-login-container">
                  <div className="individuals-login-title">
                    <h1>
                      <FormattedMessage id="investment_account_agreement_title" />
                    </h1>
                    <p>
                      <FormattedMessage id="select_account_type" />
                    </p>
                    <div className="individuals-login-buttons">
                      <LocalizedLink to={`/companies-login`}>
                        <button
                          style={{ background: "none", color: "#46235E" }}
                        >
                          <FormattedMessage id="corporate_account" />
                        </button>
                      </LocalizedLink>
                      <LocalizedLink to={`/Individuals-login`}>
                        <button
                          style={{ background: "#3F1A58", color: "#FFFFFF" }}
                        >
                          <FormattedMessage id="individual_account" />
                        </button>
                      </LocalizedLink>
                    </div>
                  </div>
                  <div className="individuals-login-field">
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="personal_information_individuals" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="investor_information" />
                              <ErrorMessage
                                name="investorInformation"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="investorInformation"
                              style={{
                                border:
                                  errors.investorInformation &&
                                  touched.investorInformation
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="please_select" />
                              </option>
                              <option value="New Account / حساب جديد">
                                <FormattedMessage id="new_account" />
                              </option>
                              <option value="Additional Account / حساب إضافي">
                                <FormattedMessage id="additional_account" />
                              </option>
                              <option value="Update Information / تحديث المعلومات">
                                <FormattedMessage id="update_information" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="full_name" />
                              <ErrorMessage
                                name="fullName"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="fullName"
                              style={{
                                border:
                                  errors.fullName && touched.fullName
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="gender" />
                              <ErrorMessage
                                name="gender"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="gender"
                              style={{
                                border:
                                  errors.gender && touched.gender
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="please_select" />
                              </option>
                              <option value="Male / ذكر">
                                <FormattedMessage id="male" />
                              </option>
                              <option value="Female / أنثى">
                                <FormattedMessage id="female" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="investor_title" />{" "}
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              style={{
                                border:
                                  errors.title && touched.title
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              as="select"
                              name="title"
                            >
                              <option value="">
                                <FormattedMessage id="please_select" />
                              </option>
                              <option value="Mr. / السيد">
                                <FormattedMessage id="mr" />
                              </option>
                              <option value="Mrs. / السيدة">
                                <FormattedMessage id="mrs" />
                              </option>
                              <option value="Miss. / الآنسة">
                                <FormattedMessage id="miss" />
                              </option>
                              <option value="Dr. / دكتور">
                                <FormattedMessage id="dr" />
                              </option>
                              <option value="Eng. / مهندس">
                                <FormattedMessage id="eng" />
                              </option>
                              <option value="Other / أخرى">
                                <FormattedMessage id="other" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="date_of_birth" />{" "}
                              <ErrorMessage
                                name="dateOfBirth"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="date"
                              name="dateOfBirth"
                              max={new Date().toISOString().split("T")[0]}
                              style={{
                                border:
                                  errors.dateOfBirth && touched.dateOfBirth
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="marital_status" />{" "}
                              <ErrorMessage
                                name="maritalStatus"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="maritalStatus"
                              style={{
                                border:
                                  errors.maritalStatus && touched.maritalStatus
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              onChange={event => {
                                handleMaritalStatusChange(event) // Call your change handler
                                values.maritalStatus = event.target.value // Also update Formik value directly
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="please_select" />
                              </option>
                              <option value="Single / أعزب">
                                <FormattedMessage id="single" />
                              </option>
                              <option value="Married / متزوج">
                                <FormattedMessage id="married" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="number_of_dependents" />{" "}
                              <ErrorMessage
                                name="numberOfDependents"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={maritalStatusNum !== 0} // Not required if maritalStatusNum is 0
                              type="number"
                              name="numberOfDependents"
                              style={{
                                border:
                                  errors.numberOfDependents &&
                                  touched.numberOfDependents
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="nationality" />{" "}
                              <ErrorMessage
                                name="nationality"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="nationality"
                              style={{
                                border:
                                  errors.nationality && touched.nationality
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="identity_type" />{" "}
                              <ErrorMessage
                                name="identityType"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="identityType"
                              style={{
                                border:
                                  errors.identityType && touched.identityType
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="please_select" />
                              </option>
                              <option value="National ID / الهوية الوطنية">
                                <FormattedMessage id="national_id" />
                              </option>
                              <option value="Passport / جواز السفر">
                                <FormattedMessage id="passport" />
                              </option>
                              <option value="Residence ID / هوية الإقامة">
                                <FormattedMessage id="residence_id" />
                              </option>
                              <option value="Family Registration / تسجيل العائلة">
                                <FormattedMessage id="family_registration" />
                              </option>
                              <option value="Other / أخرى">
                                <FormattedMessage id="other" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="identity_number" />{" "}
                              <ErrorMessage
                                name="identityNumber"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="identityNumber"
                              type="number"
                              style={{
                                border:
                                  errors.identityNumber &&
                                  touched.identityNumber
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="issue_date" />{" "}
                              <ErrorMessage
                                name="issueDate"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              type="date"
                              name="issueDate"
                              max={new Date().toISOString().split("T")[0]}
                              style={{
                                border:
                                  errors.issueDate && touched.issueDate
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="expiration_date" />{" "}
                              <ErrorMessage
                                name="expirationDate"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="date"
                              name="expirationDate"
                              min={values.issueDate}
                              style={{
                                border:
                                  errors.expirationDate &&
                                  touched.expirationDate
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="place_of_issue" />{" "}
                              <ErrorMessage
                                name="placeOfIssue"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              style={{
                                border:
                                  errors.placeOfIssue && touched.placeOfIssue
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              name="placeOfIssue"
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    {/* Address Section */}
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="address.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="postalCode.label" />{" "}
                              <ErrorMessage
                                name="postalCode"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="postalCode"
                              type="number"
                              style={{
                                border:
                                  errors.postalCode && touched.postalCode
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="poBox.label" />{" "}
                              <ErrorMessage
                                name="poBox"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              name="poBox"
                              style={{
                                border:
                                  errors.poBox && touched.poBox
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label htmlFor="correspondenceLanguage">
                              <FormattedMessage id="correspondenceLanguage.label" />{" "}
                              <ErrorMessage
                                name="correspondenceLanguage"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              style={{
                                border:
                                  errors.correspondenceLanguage &&
                                  touched.correspondenceLanguage
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              as="select"
                              id="correspondenceLanguage"
                              name="correspondenceLanguage"
                            >
                              <option value="">
                                <FormattedMessage id="correspondenceLanguage.placeholder" />
                              </option>
                              <option value="EN / الإنجليزية">
                                <FormattedMessage id="correspondenceLanguage.option.EN" />
                              </option>
                              <option value="AR / العربية">
                                <FormattedMessage id="correspondenceLanguage.option.AR" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="email.label" />{" "}
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="email"
                              style={{
                                border:
                                  errors.email && touched.email
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="mobileNumber.label" />{" "}
                              <ErrorMessage
                                name="mobileNumber"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="mobileNumber"
                              type="number"
                              style={{
                                border:
                                  errors.mobileNumber && touched.mobileNumber
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="telephoneNumber.label" />{" "}
                              <ErrorMessage
                                name="telephoneNumber"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              name="telephoneNumber"
                              type="number"
                              style={{
                                border:
                                  errors.telephoneNumber &&
                                  touched.telephoneNumber
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="country.label" />{" "}
                              <ErrorMessage
                                name="country"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="country"
                              style={{
                                border:
                                  errors.country && touched.country
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="building.label" />{" "}
                              <ErrorMessage
                                name="Building"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="Building"
                              type="number"
                              style={{
                                border:
                                  errors.Building && touched.Building
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="city.label" />{" "}
                              <ErrorMessage
                                name="city"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="city"
                              style={{
                                border:
                                  errors.city && touched.city
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="bankInfo.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="bankName.label" />{" "}
                              <ErrorMessage
                                name="bankName"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="bankName"
                              style={{
                                border:
                                  errors.bankName && touched.bankName
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="ibanNumber.label" />{" "}
                              <ErrorMessage
                                name="ibanNumber"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="ibanNumber"
                              type="text"
                              maxLength={34}
                              pattern="^[A-Z]{2}[0-9]{2}[A-Z0-9]{0,30}$"
                              style={{
                                border:
                                  errors.ibanNumber && touched.ibanNumber
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="bankBranch.label" />{" "}
                              <ErrorMessage
                                name="bankBranch"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="bankBranch"
                              style={{
                                border:
                                  errors.bankBranch && touched.bankBranch
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="bankCity.label" />{" "}
                              <ErrorMessage
                                name="bankCity"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="bankCity"
                              style={{
                                border:
                                  errors.bankCity && touched.bankCity
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="currency.label" />{" "}
                              <ErrorMessage
                                name="Currency"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="Currency"
                              style={{
                                border:
                                  errors.Currency && touched.Currency
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="correspondence.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="incomeSource.label" />{" "}
                              <ErrorMessage
                                name="incomeSource"
                                component="div"
                                className="error"
                              />
                            </label>
                            <CustomMultiSelect
                              name="incomeSource"
                              value={values.incomeSource}
                              onChange={setFieldValue}
                              // onBlur={setFieldTouched}
                              errors={errors.incomeSource}
                              touched={touched.incomeSource}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="communicationMethod.label" />{" "}
                              <ErrorMessage
                                name="communicationMethod"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="communicationMethod"
                              style={{
                                border:
                                  errors.communicationMethod &&
                                  touched.communicationMethod
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="communicationMethod.placeholder" />
                              </option>
                              <option value="Email / بريد إلكتروني">
                                <FormattedMessage id="communicationMethod.email" />
                              </option>
                              <option value="Fax / فاكس">
                                <FormattedMessage id="communicationMethod.fax" />
                              </option>
                              <option value="SMS / رسالة نصية">
                                <FormattedMessage id="communicationMethod.sms" />
                              </option>
                              <option value="Mail / بريد">
                                <FormattedMessage id="communicationMethod.mail" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="correspondenceType.label" />{" "}
                              <ErrorMessage
                                name="Correspondence"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="Correspondence"
                              style={{
                                border:
                                  errors.Correspondence &&
                                  touched.Correspondence
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="correspondenceType.placeholder" />
                              </option>
                              <option value="Per Transaction / لكل معاملة">
                                <FormattedMessage id="accountStatements.perTransaction" />
                              </option>
                              <option value="Daily / يومي">
                                <FormattedMessage id="accountStatements.daily" />
                              </option>
                              <option value="Monthly / شهري">
                                <FormattedMessage id="accountStatements.monthly" />
                              </option>
                              <option value="Upon Request / عند الطلب">
                                <FormattedMessage id="accountStatements.uponRequest" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label htmlFor="annualIncome">
                              <FormattedMessage id="annualIncome.label" />{" "}
                              <ErrorMessage
                                name="annualIncome"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              id="annualIncome"
                              name="annualIncome"
                              style={{
                                border:
                                  errors.annualIncome && touched.annualIncome
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="annualIncome.placeholder" />
                              </option>
                              <option value="100,000 أو أقل Or less">
                                <FormattedMessage
                                  id="netWorth.100kOrLess"
                                  defaultMessage="100,000 أو أقل Or less"
                                />
                              </option>
                              <option value="300,000-100,001">
                                <FormattedMessage
                                  id="netWorth.range300kTo100k"
                                  defaultMessage="300,000 - 100,001"
                                />
                              </option>
                              <option value="600,000-300,001">
                                <FormattedMessage
                                  id="netWorth.range600kTo300k"
                                  defaultMessage="600,000 - 300,001"
                                />
                              </option>
                              <option value="1,500,000 - 600,001">
                                <FormattedMessage
                                  id="netWorth.range1_5mTo600k"
                                  defaultMessage="1,500,000 - 600,001"
                                />
                              </option>
                              <option value="5,000,000 1,500,001">
                                <FormattedMessage
                                  id="netWorth.range5mTo1_5m"
                                  defaultMessage="5,000,000 - 1,500,001"
                                />
                              </option>
                              <option value="10,0000,000-5,000,001">
                                <FormattedMessage
                                  id="netWorth.range10mTo5m"
                                  defaultMessage="10,000,000 - 5,000,001"
                                />
                              </option>
                              <option value="50,000,000-10,000,001">
                                <FormattedMessage
                                  id="netWorth.range50mTo10m"
                                  defaultMessage="50,000,000 - 10,000,001"
                                />
                              </option>
                              <option value="More Than 50,000,000">
                                <FormattedMessage
                                  id="netWorth.moreThan50m"
                                  defaultMessage="More Than 50,000,000"
                                />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="netWorth.label" />{" "}
                              <ErrorMessage
                                name="netWorth"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              id="netWorth"
                              name="netWorth"
                              style={{
                                border:
                                  errors.netWorth && touched.netWorth
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="annualIncome.placeholder" />
                              </option>
                              <option value="100,000 أو أقل Or less">
                                <FormattedMessage
                                  id="netWorth.100kOrLess"
                                  defaultMessage="100,000 أو أقل Or less"
                                />
                              </option>
                              <option value="300,000-100,001">
                                <FormattedMessage
                                  id="netWorth.range300kTo100k"
                                  defaultMessage="300,000 - 100,001"
                                />
                              </option>
                              <option value="600,000-300,001">
                                <FormattedMessage
                                  id="netWorth.range600kTo300k"
                                  defaultMessage="600,000 - 300,001"
                                />
                              </option>
                              <option value="1,500,000 - 600,001">
                                <FormattedMessage
                                  id="netWorth.range1_5mTo600k"
                                  defaultMessage="1,500,000 - 600,001"
                                />
                              </option>
                              <option value="5,000,000 1,500,001">
                                <FormattedMessage
                                  id="netWorth.range5mTo1_5m"
                                  defaultMessage="5,000,000 - 1,500,001"
                                />
                              </option>
                              <option value="10,0000,000-5,000,001">
                                <FormattedMessage
                                  id="netWorth.range10mTo5m"
                                  defaultMessage="10,000,000 - 5,000,001"
                                />
                              </option>
                              <option value="50,000,000-10,000,001">
                                <FormattedMessage
                                  id="netWorth.range50mTo10m"
                                  defaultMessage="50,000,000 - 10,000,001"
                                />
                              </option>
                              <option value="More Than 50,000,000">
                                <FormattedMessage
                                  id="netWorth.moreThan50m"
                                  defaultMessage="More Than 50,000,000"
                                />
                              </option>
                            </Field>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="careerInfo.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="academicQualifications.label" />{" "}
                              <ErrorMessage
                                name="academicQualifications"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              id="academicQualifications"
                              name="academicQualifications"
                              style={{
                                border:
                                  errors.academicQualifications &&
                                  touched.academicQualifications
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="academicQualifications.placeholder" />
                              </option>
                              <option value="Primary / ابتدائي">
                                <FormattedMessage id="academicQualifications.primary" />
                              </option>
                              <option value="Intermediate / متوسط">
                                <FormattedMessage id="academicQualifications.intermediate" />
                              </option>
                              <option value="High School / ثانوية عامة">
                                <FormattedMessage id="academicQualifications.highSchool" />
                              </option>
                              <option value="Diploma / دبلوم">
                                <FormattedMessage id="academicQualifications.diploma" />
                              </option>
                              <option value="Bachelor / بكاليوس">
                                <FormattedMessage id="academicQualifications.bachelor" />
                              </option>
                              <option value="Postgraduate / دراسات عليا">
                                <FormattedMessage id="academicQualifications.postgraduate" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="sector.label" />{" "}
                              <ErrorMessage
                                name="Sector"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              onChange={event => {
                                handleRetiredChange(event) // Call your change handler
                                values.Sector = event.target.value // Also update Formik value directly
                              }}
                              as="select"
                              id="Sector"
                              name="Sector"
                              style={{
                                border:
                                  errors.Sector && touched.Sector
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="sector.placeholder" />
                              </option>
                              <option value="Government / حكومي">
                                <FormattedMessage id="sector.government" />
                              </option>
                              <option value="Private / خاص">
                                <FormattedMessage id="sector.private" />
                              </option>
                              <option value="Self-Employment / العمل الحر">
                                <FormattedMessage id="sector.selfEmployment" />
                              </option>
                              <option value="Retired / متقاعد">
                                <FormattedMessage id="sector.retired" />
                              </option>
                              <option value="Other / أخرى">
                                <FormattedMessage id="sector.other" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="employmentCategory.label" />{" "}
                              <ErrorMessage
                                name="employmentCategory"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              as="select"
                              id="employmentCategory"
                              name="employmentCategory"
                              style={{
                                border:
                                  errors.employmentCategory &&
                                  touched.employmentCategory
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="employmentCategory.placeholder" />
                              </option>
                              <option value="Full-Time / دوام كامل">
                                <FormattedMessage id="employmentCategory.fullTime" />
                              </option>
                              <option value="Part-Time / دوام جزئي">
                                <FormattedMessage id="employmentCategory.partTime" />
                              </option>
                              <option value="Contract / عقد">
                                <FormattedMessage id="employmentCategory.contract" />
                              </option>
                              <option value="Freelance / عمل حر">
                                <FormattedMessage id="employmentCategory.freelance" />
                              </option>
                              <option value="Internship / تدريب">
                                <FormattedMessage id="employmentCategory.internship" />
                              </option>
                              <option value="Temporary / مؤقت">
                                <FormattedMessage id="employmentCategory.temporary" />
                              </option>
                              <option value="Other / أخرى">
                                <FormattedMessage id="employmentCategory.other" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="employerName.label" />{" "}
                              <ErrorMessage
                                name="employerName"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              name="employerName"
                              style={{
                                border:
                                  errors.employerName && touched.employerName
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="jobTitle.label" />{" "}
                              <ErrorMessage
                                name="jobTitle"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              name="jobTitle"
                              style={{
                                border:
                                  errors.jobTitle && touched.jobTitle
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="employerAddress.label" />{" "}
                              <ErrorMessage
                                name="employerAddress"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              name="employerAddress"
                              style={{
                                border:
                                  errors.employerAddress &&
                                  touched.employerAddress
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="yearsEmployment.label" />{" "}
                              <ErrorMessage
                                name="yearsEmployment"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              name="yearsEmployment"
                              type="number"
                              min={0} // Minimum value
                              max={100} // Adjust max value as needed
                              style={{
                                border:
                                  errors.yearsEmployment &&
                                  touched.yearsEmployment
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="employerPhone.label" />{" "}
                              <ErrorMessage
                                name="employerPhone"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required={retiredNum !== 0}
                              name="employerPhone"
                              type="number"
                              style={{
                                border:
                                  errors.employerPhone && touched.employerPhone
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="financialExperience.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="financialExperience.label" />
                              <ErrorMessage
                                name="financialExperience"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="financialExperience"
                              style={{
                                border:
                                  errors.financialExperience &&
                                  touched.financialExperience
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="financialExperience.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="financialExperience.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="financialExperience.no" />
                              </option>
                            </Field>
                          </div>

                          {values.financialExperience === "Yes / نعم" && (
                            <div className="individuals-single-field">
                              <label>
                                *
                                <FormattedMessage id="otherFinancialExperience.label" />
                                <ErrorMessage
                                  name="otherFinancialExperience"
                                  component="div"
                                  className="error"
                                />
                              </label>
                              <Field
                                required
                                name="otherFinancialExperience"
                                type="number"
                                min={0} // Minimum value
                                max={100} // Adjust max value as needed
                                style={{
                                  border:
                                    errors.otherFinancialExperience &&
                                    touched.otherFinancialExperience
                                      ? "1px solid red"
                                      : "1px solid #ccc",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="generalInformation.title" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="generalInformation.boardMembership.label" />
                              <ErrorMessage
                                name="boardMembership"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="select"
                              name="boardMembership"
                              required
                              style={{
                                border:
                                  errors.boardMembership &&
                                  touched.boardMembership
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.boardMembership.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="generalInformation.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="generalInformation.no" />
                              </option>
                            </Field>
                            {values.boardMembership === "Yes / نعم" && (
                              <>
                                <Field
                                  type="text"
                                  name="companyName"
                                  style={{
                                    border:
                                      errors.companyName && touched.companyName
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                  }}
                                />
                                <ErrorMessage
                                  name="companyName"
                                  component="div"
                                  className="error"
                                />
                              </>
                            )}
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="generalInformation.seniorPosition.label" />
                              <ErrorMessage
                                name="seniorPosition"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="select"
                              name="seniorPosition"
                              required
                              style={{
                                border:
                                  errors.seniorPosition &&
                                  touched.seniorPosition
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.seniorPosition.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="generalInformation.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="generalInformation.no" />
                              </option>
                            </Field>
                          </div>
                        </div>

                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="generalInformation.familyRelationship.label" />
                              <ErrorMessage
                                name="familyRelationship"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="select"
                              name="familyRelationship"
                              required
                              style={{
                                border:
                                  errors.familyRelationship &&
                                  touched.familyRelationship
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.familyRelationship.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="generalInformation.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="generalInformation.no" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              * <FormattedMessage id="generalInformation.accountOwnership.label" />
                              <ErrorMessage
                                name="accountOwnership"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="select"
                              name="accountOwnership"
                              required
                              style={{
                                border:
                                  errors.accountOwnership &&
                                  touched.accountOwnership
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.accountOwnership.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="generalInformation.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="generalInformation.no" />
                              </option>
                            </Field>
                          </div>
                        </div>

                        {values.accountOwnership === "No / لا" && (
                          <div className="individuals-sec-field">
                            <div className="individuals-single-field">
                              <label>
                                ` <FormattedMessage id="generalInformation.beneficialOwnership.label" />
                                <ErrorMessage
                                  name="beneficialOwnership"
                                  component="div"
                                  className="error"
                                />
                              </label>
                              <Field
                                as="textarea"
                                name="beneficialOwnership"
                                
                                style={{
                                  border:
                                    errors.beneficialOwnership &&
                                    touched.beneficialOwnership
                                      ? "1px solid red"
                                      : "1px solid #ccc",
                                }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="generalInformation.bankAccountOwnership.label" />
                              <ErrorMessage
                                name="bankAccountOwnership"
                                component="div"
                                className="error"
                                required
                              />
                            </label>
                            <Field
                              as="select"
                              name="bankAccountOwnership"
                              required
                              style={{
                                border:
                                  errors.bankAccountOwnership &&
                                  touched.bankAccountOwnership
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.bankAccountOwnership.placeholder" />
                              </option>
                              <option value="Yes / نعم">
                                <FormattedMessage id="generalInformation.yes" />
                              </option>
                              <option value="No / لا">
                                <FormattedMessage id="generalInformation.no" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label htmlFor="expectedDuration">
                              *<FormattedMessage id="generalInformation.expectedDuration.label" />
                              <ErrorMessage
                                name="expectedDuration"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="select"
                              id="expectedDuration"
                              name="expectedDuration"
                              required
                              style={{
                                border:
                                  errors.expectedDuration &&
                                  touched.expectedDuration
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                              </option>
                              <option value="shortTerm / قصير الأجل">
                                <FormattedMessage id="generalInformation.expectedDuration.shortTerm" />
                              </option>
                              <option value="mediumTerm / متوسط الأجل">
                                <FormattedMessage id="generalInformation.expectedDuration.mediumTerm" />
                              </option>
                              <option value="longTerm / طويل الأجل">
                                <FormattedMessage id="generalInformation.expectedDuration.longTerm" />
                              </option>
                            </Field>
                          </div>
                        </div>

                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="generalInformation.financialSituationInfo.label" />
                              <ErrorMessage
                                name="financialSituationInfo"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              as="textarea"
                              name="financialSituationInfo"
                              style={{
                                border:
                                  errors.financialSituationInfo &&
                                  touched.financialSituationInfo
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="specialCaseInformation.heading" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.incompetentLegalGuardian" />
                            </label>
                            <Field name="incompetentLegalGuardian" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.veiledWomanId" />
                            </label>
                            <Field name="veiledWomanId" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.illiterateBlindWitness" />
                            </label>
                            <Field name="illiterateBlindWitness" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgent" />
                            </label>
                            <Field name="inheritorsAgent" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.fatherGuardianMinor" />
                            </label>
                            <Field name="fatherGuardianMinor" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentName" />
                            </label>
                            <Field name="inheritorsAgentName" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentId" />
                            </label>
                            <Field name="inheritorsAgentId" type="number" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentIdType" />
                            </label>
                            <Field name="inheritorsAgentIdType" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentIssueDate" />
                            </label>
                            <Field
                              type="date"
                              name="inheritorsAgentIssueDate"
                              max={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentExpiryDate" />
                            </label>
                            <Field
                              type="date"
                              name="inheritorsAgentExpiryDate"
                              min={values.inheritorsAgentIssueDate}
                            />
                          </div>

                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentTelNo" />
                            </label>
                            <Field name="inheritorsAgentTelNo" type="number" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentPlaceOfIssue" />
                            </label>
                            <Field name="inheritorsAgentPlaceOfIssue" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentSignature" />
                            </label>
                            <Field name="inheritorsAgentSignature" />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="specialCaseInformation.inheritorsAgentFaxNo" />
                            </label>
                            <Field name="inheritorsAgentFaxNo" type="number" />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="investmentExperience.heading" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.knowledgeDescription" />
                              <ErrorMessage
                                name="investmentKnowledgeDescription"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="investmentKnowledgeDescription"
                              style={{
                                border:
                                  errors.investmentKnowledgeDescription &&
                                  touched.investmentKnowledgeDescription
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                              </option>
                              <option value="Extensive / شامل">
                                <FormattedMessage id="investmentExperience.extensive" />
                              </option>
                              <option value="Good / جيد">
                                <FormattedMessage id="investmentExperience.good" />
                              </option>
                              <option value="Limited / محدود">
                                <FormattedMessage id="investmentExperience.limited" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.years" />
                              <ErrorMessage
                                name="investmentYears"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              
                              name="investmentYears"
                              style={{
                                border:
                                  errors.investmentYears &&
                                  touched.investmentYears
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.previousInvestments" />
                              <ErrorMessage
                                name="previousInvestments"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="previousInvestments"
                              style={{
                                border:
                                  errors.previousInvestments &&
                                  touched.previousInvestments
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.professionalCertificates" />
                              <ErrorMessage
                                name="professionalCertificates"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="professionalCertificates"
                              style={{
                                border:
                                  errors.professionalCertificates &&
                                  touched.professionalCertificates
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.loanToInvestedMoneyRatio" />
                              <ErrorMessage
                                name="loanToInvestedMoneyRatio"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="loanToInvestedMoneyRatio"
                              style={{
                                border:
                                  errors.loanToInvestedMoneyRatio &&
                                  touched.loanToInvestedMoneyRatio
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.marginTransactions" />
                              <ErrorMessage
                                name="marginTransactions"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="marginTransactions"
                              style={{
                                border:
                                  errors.marginTransactions &&
                                  touched.marginTransactions
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.securitiesTransactionsOutsideKingdom" />
                              <ErrorMessage
                                name="securitiesTransactionsOutsideKingdom"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="securitiesTransactionsOutsideKingdom"
                              style={{
                                border:
                                  errors.securitiesTransactionsOutsideKingdom &&
                                  touched.securitiesTransactionsOutsideKingdom
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.countriesForSecuritiesTransactions" />
                              <ErrorMessage
                                name="countriesForSecuritiesTransactions"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              type="text"
                              name="countriesForSecuritiesTransactions"
                              style={{
                                border:
                                  errors.countriesForSecuritiesTransactions &&
                                  touched.countriesForSecuritiesTransactions
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="investmentExperience.riskAppetite" />
                              <ErrorMessage
                                name="riskAppetite"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="riskAppetite"
                              style={{
                                border:
                                  errors.riskAppetite && touched.riskAppetite
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="generalInformation.expectedDuration.placeholder" />
                              </option>
                              <option value="Extensive / شامل">
                                <FormattedMessage id="investmentExperience.extensive" />
                              </option>
                              <option value="Good / جيد">
                                <FormattedMessage id="investmentExperience.good" />
                              </option>
                              <option value="Limited / محدود">
                                <FormattedMessage id="investmentExperience.limited" />
                              </option>
                            </Field>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="investmentGoals.heading" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.capitalProtection" />
                            </label>
                            <Field
                              type="checkbox"
                              name="capitalProtection"
                              
                            />
                          </div>
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.incomeGeneration" />
                            </label>
                            <Field
                              type="checkbox"
                              name="incomeGeneration"
                            />
                          </div>
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.balanced" />
                            </label>
                            <Field
                              type="checkbox"
                              name="balanced"
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.capitalGrowth" />
                            </label>
                            <Field
                              type="checkbox"
                              name="capitalGrowth"
                            />
                          </div>
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.retirementSavings" />
                            </label>
                            <Field
                              type="checkbox"
                              name="retirementSavings"
                            />
                          </div>
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.projectFinancing" />
                            </label>
                            <Field
                              type="checkbox"
                              name="projectFinancing"
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="investmentGoals.assetPurchase" />
                            </label>
                            <Field
                              type="checkbox"
                              name="assetPurchase"
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="investmentGoals.other" />
                            </label>
                            <Field name="other" />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="favoriteInvestmentAssets.heading" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <label className="selectMultipleCategories">
                          <FormattedMessage id="favoriteInvestmentAssets.selectMultipleCategories" />
                        </label>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="favoriteInvestmentAssets.saudiAssets" />
                            </label>
                            <Field type="checkbox" name="saudiAssets" />
                          </div>
                          <div className="individuals-single-field checkbox">
                            <label>
                              <FormattedMessage id="favoriteInvestmentAssets.foreignCurrencyAssets" />
                            </label>
                            <Field
                              type="checkbox"
                              name="foreignCurrencyAssets"
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          {({ values }) =>
                            values.foreignCurrencyAssets && (
                              <div className="individuals-single-field">
                                <label>
                                  *
                                  <FormattedMessage id="favoriteInvestmentAssets.selectForeignCurrencies" />
                                  <ErrorMessage
                                    name="selectedForeignCurrencies"
                                    component="div"
                                    className="error"
                                  />
                                </label>
                                <Field
                                  required
                                  name="selectedForeignCurrencies"
                                />
                              </div>
                            )
                          }
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="investmentPortfolioInformation.heading" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field table">
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="investment portfolio table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.investmentTools" />
                                  </TableCell>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.currentClientPortfolio" />
                                  </TableCell>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.idealClientPortfolio" />
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map(row => (
                                  <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                      {row.label}
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        required
                                        type="number"
                                        name={`clientCurrentWallet${row.id}`}
                                        min="0"
                                        step="any"
                                        onChange={e => {
                                          const value =
                                            parseFloat(e.target.value) || 0
                                          const newCurrentTotal =
                                            calculateTotal(
                                              "clientCurrentWallet",
                                              values,
                                              row.id,
                                              value
                                            )

                                          if (newCurrentTotal > 100) {
                                            const adjustedValue = Math.max(
                                              0,
                                              value - (newCurrentTotal - 100)
                                            )
                                            setFieldValue(
                                              `clientCurrentWallet${row.id}`,
                                              adjustedValue
                                            )
                                          } else {
                                            setFieldValue(
                                              `clientCurrentWallet${row.id}`,
                                              value
                                            )
                                          }

                                          // Check if the new total is 100% and update a state variable
                                          setIsCurrentTotal100(
                                            newCurrentTotal === 100
                                          )
                                        }}
                                        style={{
                                          border:
                                            errors[
                                              `clientCurrentWallet${row.id}`
                                            ] &&
                                            touched[
                                              `clientCurrentWallet${row.id}`
                                            ]
                                              ? "1px solid red"
                                              : "1px solid #ccc",
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`clientCurrentWallet${row.id}`}
                                        component="div"
                                        className="error"
                                      />
                                      {isCurrentTotal100 && (
                                        <div
                                          style={{
                                            color: "red",
                                            marginTop: "5px",
                                            fontSize: "0.8em",
                                          }}
                                        >
                                          <FormattedMessage id="inputErrorMessage" />
                                        </div>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        required
                                        type="number"
                                        name={`idealportfoliofortheclient${row.id}`}
                                        min="0"
                                        step="any"
                                        onChange={e => {
                                          const value =
                                            parseFloat(e.target.value) || 0
                                          const newIdealTotal = calculateTotal(
                                            "idealportfoliofortheclient",
                                            values,
                                            row.id,
                                            value
                                          )

                                          if (newIdealTotal > 100) {
                                            const adjustedValue = Math.max(
                                              0,
                                              value - (newIdealTotal - 100)
                                            )
                                            setFieldValue(
                                              `idealportfoliofortheclient${row.id}`,
                                              adjustedValue
                                            )
                                          } else {
                                            setFieldValue(
                                              `idealportfoliofortheclient${row.id}`,
                                              value
                                            )
                                          }

                                          // Check if the new total is 100% and update a state variable
                                          setIsIdealTotal100(
                                            newIdealTotal === 100
                                          )
                                        }}
                                        style={{
                                          border:
                                            errors[
                                              `idealportfoliofortheclient${row.id}`
                                            ] &&
                                            touched[
                                              `idealportfoliofortheclient${row.id}`
                                            ]
                                              ? "1px solid red"
                                              : "1px solid #ccc",
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`idealportfoliofortheclient${row.id}`}
                                        component="div"
                                        className="error"
                                      />
                                      {isIdealTotal100 && (
                                        <div
                                          style={{
                                            color: "red",
                                            marginTop: "5px",
                                            fontSize: "0.8em",
                                          }}
                                        >
                                          <FormattedMessage id="inputErrorMessage" />
                                        </div>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell>
                                    <FormattedMessage id="tableData.checkPercentageSum" />
                                  </TableCell>
                                  <TableCell>
                                    {calculateTotal(
                                      "clientCurrentWallet",
                                      values
                                    ).toFixed(2)}
                                    %
                                  </TableCell>
                                  <TableCell>
                                    {calculateTotal(
                                      "idealportfoliofortheclient",
                                      values
                                    ).toFixed(2)}
                                    %
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded className="table-table">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="header.custodianInfo" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="form.accountNumber" />
                              <ErrorMessage
                                name="accountNumber"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              name="accountNumber"
                              style={{
                                border:
                                  errors.accountNumber && touched.accountNumber
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="form.custodianName" />
                              <ErrorMessage
                                name="custodianName"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              name="custodianName"
                              style={{
                                border:
                                  errors.custodianName && touched.custodianName
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              <FormattedMessage id="form.custodianAddress" />
                              <ErrorMessage
                                name="custodianAddress"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              name="custodianAddress"
                              style={{
                                border:
                                  errors.custodianAddress &&
                                  touched.custodianAddress
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field table">
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="send to table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.sendTo" />
                                  </TableCell>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.client" />
                                  </TableCell>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.custodian" />
                                  </TableCell>
                                  <TableCell>
                                    <FormattedMessage id="tableHeader.otherEntities" />
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows2.map(row => (
                                  <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                      {row.label}
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        type="checkbox"
                                        name={`client${row.id}`}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        type="checkbox"
                                        name={`custodian${row.id}`}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        as={TextField}
                                        name={`OtherParties${row.id}`}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                      />
                                      <ErrorMessage
                                        name={`OtherParties${row.id}`}
                                        component="div"
                                        className="error"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="individuals-login-field"
                        className="individuals-sec-field-title"
                      >
                        <h3>
                          <FormattedMessage id="accordion.sectionTitle" />
                        </h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.q1" />
                              <ErrorMessage
                                name="q1Answer"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              name="q1Answer"
                              style={{
                                border:
                                  errors.q1Answer && touched.q1Answer
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              onChange={e => {
                                setFieldValue("q1Answer", e.target.value)
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="question.selectOption" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="question.q1.option1" />
                              </option>
                              <option value="2">
                                <FormattedMessage id="question.q1.option2" />
                              </option>
                              <option value="3">
                                <FormattedMessage id="question.q1.option3" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.q2" />
                              <ErrorMessage
                                name="q2Answer"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              style={{
                                border:
                                  errors.q2Answer && touched.q2Answer
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              name="q2Answer"
                              onChange={e => {
                                setFieldValue("q2Answer", e.target.value)
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="question.selectOption" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="question.q2.option1" />
                              </option>
                              <option value="2">
                                <FormattedMessage id="question.q2.option2" />
                              </option>
                              <option value="3">
                                <FormattedMessage id="question.q2.option3" />
                              </option>
                              <option value="4">
                                <FormattedMessage id="question.q2.option4" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.q3" />
                              <ErrorMessage
                                name="q3Answer"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              style={{
                                border:
                                  errors.q3Answer && touched.q3Answer
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              name="q3Answer"
                              onChange={e => {
                                setFieldValue("q3Answer", e.target.value)
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="question.selectOption" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="question.q3.option1" />
                              </option>
                              <option value="2">
                                <FormattedMessage id="question.q3.option2" />
                              </option>
                              <option value="3">
                                <FormattedMessage id="question.q3.option3" />
                              </option>
                              <option value="4">
                                <FormattedMessage id="question.q3.option4" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.q4" />
                              <ErrorMessage
                                name="q4Answer"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              style={{
                                border:
                                  errors.q4Answer && touched.q4Answer
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              name="q4Answer"
                              onChange={e => {
                                setFieldValue("q4Answer", e.target.value)
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="question.selectOption" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="question.q4.option1" />
                              </option>
                              <option value="2">
                                <FormattedMessage id="question.q4.option2" />
                              </option>
                              <option value="3">
                                <FormattedMessage id="question.q4.option3" />
                              </option>
                              <option value="4">
                                <FormattedMessage id="question.q4.option4" />
                              </option>
                            </Field>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.q5" />
                              <ErrorMessage
                                name="q5Answer"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              as="select"
                              style={{
                                border:
                                  errors.q5Answer && touched.q5Answer
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                              name="q5Answer"
                              onChange={e => {
                                setFieldValue("q5Answer", e.target.value)
                              }}
                            >
                              <option value="">
                                <FormattedMessage id="question.selectOption" />
                              </option>
                              <option value="1">
                                <FormattedMessage id="question.q5.option1" />
                              </option>
                              <option value="2">
                                <FormattedMessage id="question.q5.option2" />
                              </option>
                              <option value="3">
                                <FormattedMessage id="question.q5.option3" />
                              </option>
                              <option value="4">
                                <FormattedMessage id="question.q5.option4" />
                              </option>
                            </Field>
                          </div>
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.totalPoints" />
                            </label>
                            <div className="calculateTotalPoints">
                              <h4>{calculateTotalPoints(values)}</h4>{" "}
                              {/* Call the function with current values */}
                            </div>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="result.lowRisk" />
                            </label>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="result.mediumRisk" />
                            </label>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="result.highRisk" />
                            </label>
                          </div>
                        </div>
                        <div className="individuals-sec-field">
                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.recommendation" />
                            </label>
                            <label className="recommendation">
                              {calculateTotalPoints(values) >= 1 &&
                                calculateTotalPoints(values) <= 6 && (
                                  <FormattedMessage id="lowRisk" />
                                )}
                              {calculateTotalPoints(values) >= 7 &&
                                calculateTotalPoints(values) <= 15 && (
                                  <FormattedMessage id="mediumRisk" />
                                )}
                              {calculateTotalPoints(values) > 15 && (
                                <FormattedMessage id="highRisk" />
                              )}
                            </label>
                          </div>

                          <div className="individuals-single-field">
                            <label>
                              *
                              <FormattedMessage id="question.investmentDesire" />
                              <ErrorMessage
                                name="investmentDesire"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="investmentDesire"
                              style={{
                                border:
                                  errors.investmentDesire &&
                                  touched.investmentDesire
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                        <div className="individuals-sec-field">

                          <div className="individuals-single-field">
                            <label>
                              *<FormattedMessage id="question.clientName" />
                              <ErrorMessage
                                name="clientName"
                                component="div"
                                className="error"
                              />
                            </label>
                            <Field
                              required
                              name="clientName"
                              style={{
                                border:
                                  errors.clientName && touched.clientName
                                    ? "1px solid red"
                                    : "1px solid #ccc",
                              }}
                            />
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                    {/* Add other sections similarly like the Address section */}
                    <button
                      type="submit"
                      className="individuals-buttom-form"
                      disabled={isSubmitting}
                      onClick={(e) => {
                        console.log("🖱️ Submit button clicked - Individual form")
                        console.log("🔄 isSubmitting:", isSubmitting)
                        console.log("🎯 Button element:", e.target)
                        console.log("⚡ Event:", e)
                      }}
                    >
                      <FormattedMessage id="form.submit" />
                    </button>
                  </div>
                </div>
              </section>
            </Form>
          )
        }}
      </Formik>
    </Layout>
  )
}

export default IndividualsLogin
