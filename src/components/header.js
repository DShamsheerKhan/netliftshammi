import React, { useState, useEffect } from "react"
import { FormattedMessage } from "react-intl"
import { useLocalization } from "../context/LocalizationContext"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { LocalizedLink } from "./LocalizedLink"

const Header = ({ siteTitle }) => {
  // Desktop dropdown states (triggered on hover)
  const [showAboutDropdown, setShowAboutDropdown] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const [showAssetManagementDropdown, setShowAssetManagementDropdown] =
    useState(false)

  // Mobile dropdown states (triggered on click)
  const [mobileShowAboutDropdown, setMobileShowAboutDropdown] = useState(false)
  const [mobileShowServicesDropdown, setMobileShowServicesDropdown] =
    useState(false)
  const [
    mobileShowAssetManagementDropdown,
    setMobileShowAssetManagementDropdown,
  ] = useState(false)

  const [modal, setModal] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { locale, changeLocale } = useLocalization()

  useEffect(() => {
    let lastScrollTop = 0
    const onScroll = () => {
      const currentScrollPos = window.pageYOffset
      if (lastScrollTop < currentScrollPos && currentScrollPos > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollTop = currentScrollPos
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleModal = () => setModal(!modal)

  const handleLanguageChange = newLocale => {
    changeLocale(newLocale)
    // Close any open dropdowns (desktop only)
    setShowAboutDropdown(false)
    setShowServicesDropdown(false)
  }

  return (
    <header
      className={`navBar-sec ${isVisible ? "show-header" : "hide-header"}`}
      style={{ transition: "top 0.3s" }}
    >
      <div className="navBar-container">
        <div className="navBar-logo">
          <LocalizedLink to={`/`}>
            <img src="/itqanlogo.svg" alt="Logo" />
          </LocalizedLink>
        </div>
        {/* Desktop Navigation */}
        <div className="navBar-links">
          <LocalizedLink to={`/`}>
            <FormattedMessage id="home" />
          </LocalizedLink>

          {/* About Us dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
          >
            <LocalizedLink to="#">
              <FormattedMessage id="about_us" />{" "}
              <img src="/arrow.png" alt="arrow" />
            </LocalizedLink>
            {showAboutDropdown && (
              <div className="dropdown-content">
                <LocalizedLink to={`/about-us`}>
                  <FormattedMessage id="overview" />
                </LocalizedLink>
                <LocalizedLink to={`/shariyah-review`}>
                  <FormattedMessage id="sharia_board" />
                </LocalizedLink>
                <LocalizedLink to={`/board-directors`}>
                  <FormattedMessage id="organizational_structure" />
                </LocalizedLink>
                <LocalizedLink to={`/board`}>
                  <FormattedMessage id="board_of_directors" />
                </LocalizedLink>
                <LocalizedLink to={`/management-team`}>
                  <FormattedMessage id="management_team" />
                </LocalizedLink>
              </div>
            )}
          </div>

          {/* Services dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setShowServicesDropdown(true)}
            onMouseLeave={() => setShowServicesDropdown(false)}
          >
            <LocalizedLink to="#">
              <FormattedMessage id="Services" />{" "}
              <img src="/arrow.png" alt="Arrow" />
            </LocalizedLink>
            {showServicesDropdown && (
              <div className="dropdown-content">
                <div
                  className="sub-dropdown"
                  onMouseEnter={() => setShowAssetManagementDropdown(true)}
                  onMouseLeave={() => setShowAssetManagementDropdown(false)}
                >
                  <a>
                    <FormattedMessage id="asset_management" />{" "}
                    <img src="/arrow.png" alt="Arrow" />
                  </a>
                  {showAssetManagementDropdown && (
                    <div className="mega-menu-asset-management">
                      <div className="mega-menu-column">
                        <h4>
                          <FormattedMessage id="public_funds" />
                        </h4>
                        <LocalizedLink
                          to={`/asset-management/public-funds/equity`}
                        >
                          <FormattedMessage id="equity" />
                        </LocalizedLink>
                        <LocalizedLink
                          to={`/asset-management/public-funds/money-market`}
                        >
                          <FormattedMessage id="money-market" />
                        </LocalizedLink>
                      </div>
                      <div className="mega-menu-column">
                        <h4>
                          <FormattedMessage id="private_funds" />
                        </h4>
                        <LocalizedLink
                          to={`/asset-management/private-funds/real-estate`}
                        >
                          <FormattedMessage id="real-estate" />
                        </LocalizedLink>
                        <LocalizedLink
                          to={`/asset-management/private-funds/multi-assets`}
                        >
                          <FormattedMessage id="multi-assets" />
                        </LocalizedLink>
                        <LocalizedLink
                          to={`/asset-management/private-funds/private-equity`}
                        >
                          <FormattedMessage id="private-equity" />
                        </LocalizedLink>
                        
                        <LocalizedLink
                          to={`/asset-management/private-funds/venture-capital`}
                        >
                          <FormattedMessage id="venture-capital" />
                        </LocalizedLink>
                      </div>
                      <div className="mega-menu-column">
                        <h4>
                          <FormattedMessage id="product-development" />
                        </h4>
                       
                        <LocalizedLink
                          to={`/asset-management/product-development`}
                        >
                          <FormattedMessage id="product-development" />
                        </LocalizedLink>
                      </div>
                      <div className="mega-menu-column">
                        <h4>
                          <FormattedMessage id="portfolio-management" />
                        </h4>
                        <LocalizedLink
                          to={`/asset-management/portfolio-management`}
                        >
                          <FormattedMessage id="portfolio-management" />
                        </LocalizedLink>
                      
                      </div>
                    </div>
                  )}
                </div>
                <LocalizedLink to={`/Investment-banking`}>
                  <FormattedMessage id="investment_banking" />
                </LocalizedLink>
                <LocalizedLink to={`/conservation-services`}>
                  <FormattedMessage id="conservation_services" />
                </LocalizedLink>
                <LocalizedLink to={`/advisory-research`}>
                  <FormattedMessage id="advisory_research" />
                </LocalizedLink>
              </div>
            )}
          </div>

          <LocalizedLink to={`/announcements`} target="_blank">
            <FormattedMessage id="announcements" />
          </LocalizedLink>
          <LocalizedLink to={`/reports`}>
            <FormattedMessage id="reports" />
          </LocalizedLink>
          <LocalizedLink to={`/client-awareness`}>
            <FormattedMessage id="client_awareness" />
          </LocalizedLink>
          <LocalizedLink to={`/gallery`}>
            <FormattedMessage id="Media_center" />
          </LocalizedLink>
          <LocalizedLink to={`/careers`}>
            <FormattedMessage id="careers" />
          </LocalizedLink>
         
          <LocalizedLink to={`/contact-us`}>
            <FormattedMessage id="contact_us" />
          </LocalizedLink>
        </div>

        <div className="navBar-openAcc">
          <LocalizedLink to={`/Individuals-login`}>
            <button>
              <FormattedMessage id="open_new_account" />
            </button>
          </LocalizedLink>
          <div className="">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`lang-btn ${locale === "en" ? "active" : ""}`}
              style={{ display: locale === "en" ? "none" : "" }}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("ar")}
              className={`lang-btn ${locale === "ar" ? "active" : ""}`}
              style={{ display: locale === "ar" ? "none" : "" }}
            >
              AR
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <div className="">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`lang-btn ${locale === "en" ? "active" : ""}`}
              style={{ display: locale === "en" ? "none" : "" }}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("ar")}
              className={`lang-btn ${locale === "ar" ? "active" : ""}`}
              style={{ display: locale === "ar" ? "none" : "" }}
            >
              AR
            </button>
          </div>
          <Button color="danger" onClick={toggleModal}>
            <img src="/menu.png" alt="Menu" />
          </Button>

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <ModalBody>
              <div className="logo-sec-mob">
                <LocalizedLink to={`/`}>
                  <img src="/itqanlogo.svg" alt="Logo" />
                </LocalizedLink>
              </div>
              <div className="navBar-hamburger">
                <LocalizedLink to={`/`} onClick={toggleModal}>
                  <FormattedMessage id="home" />
                </LocalizedLink>

                {/* Mobile About Us Dropdown */}
                {/* About Us Dropdown */}
                <div className="mobile-dropdown">
                  <div
                    className="mobile-dropdown-header"
                    onClick={() =>
                      setMobileShowAboutDropdown(!mobileShowAboutDropdown)
                    }
                  >
                    <span>
                      <FormattedMessage id="about_us" />
                    </span>
                    <div className="toggle-icon">
                      <span
                        className={`icon icon-plus ${
                          mobileShowAboutDropdown ? "fade-out" : "fade-in"
                        }`}
                      >
                        +
                      </span>
                      <span
                        className={`icon icon-minus ${
                          mobileShowAboutDropdown ? "fade-in" : "fade-out"
                        }`}
                      >
                        -
                      </span>
                    </div>
                  </div>
                  {/* Always render the content; toggle the "open" class based on state */}
                  <div
                    className={`mobile-dropdown-content ${
                      mobileShowAboutDropdown ? "open" : ""
                    }`}
                  >
                    <LocalizedLink to={`/about-us`} onClick={toggleModal}>
                      <FormattedMessage id="overview" />
                    </LocalizedLink>
                    <LocalizedLink
                      to={`/shariyah-review`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="sharia_board" />
                    </LocalizedLink>
                    <LocalizedLink
                      to={`/board-directors`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="organizational_structure" />
                    </LocalizedLink>
                    <LocalizedLink to={`/board`} onClick={toggleModal}>
                      <FormattedMessage id="board_of_directors" />
                    </LocalizedLink>
                    <LocalizedLink
                      to={`/management-team`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="management_team" />
                    </LocalizedLink>
                  </div>
                </div>

                {/* Mobile Services Dropdown */}
                <div className="mobile-dropdown">
                  <div
                    className="mobile-dropdown-header"
                    onClick={() =>
                      setMobileShowServicesDropdown(!mobileShowServicesDropdown)
                    }
                  >
                    <span>
                      <FormattedMessage id="Services" />
                    </span>
                    <div className="toggle-icon">
                      <span
                        className={`icon icon-plus ${
                          mobileShowServicesDropdown ? "fade-out" : "fade-in"
                        }`}
                      >
                        +
                      </span>
                      <span
                        className={`icon icon-minus ${
                          mobileShowServicesDropdown ? "fade-in" : "fade-out"
                        }`}
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <div
                    className={`mobile-dropdown-content ${
                      mobileShowServicesDropdown ? "open" : ""
                    }`}
                  >
                    {/* Mobile Asset Management Sub-Dropdown */}
                    <div className="mobile-sub-dropdown">
                      <div
                        className="mobile-dropdown-header"
                        onClick={() =>
                          setMobileShowAssetManagementDropdown(
                            !mobileShowAssetManagementDropdown
                          )
                        }
                      >
                        <span>
                          <FormattedMessage id="asset_management" />
                        </span>
                        <div className="toggle-icon">
                          <span
                            className={`icon icon-plus ${
                              mobileShowAssetManagementDropdown
                                ? "fade-out"
                                : "fade-in"
                            }`}
                          >
                            +
                          </span>
                          <span
                            className={`icon icon-minus ${
                              mobileShowAssetManagementDropdown
                                ? "fade-in"
                                : "fade-out"
                            }`}
                          >
                            -
                          </span>
                        </div>
                      </div>
                      <div
                        className={`mobile-sub-dropdown-content ${
                          mobileShowAssetManagementDropdown ? "open" : ""
                        }`}
                      >
                        <div className="mobile-sub-dropdown-section">
                          <h4>
                            <FormattedMessage id="public_funds" />
                          </h4>
                          <LocalizedLink
                            to={`/asset-management/public-funds/equity`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="equity" />
                          </LocalizedLink>
                          <LocalizedLink
                            to={`/asset-management/public-funds/money-market`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="money-market" />
                          </LocalizedLink>
                        </div>
                        <div className="mobile-sub-dropdown-section">
                          <h4>
                            <FormattedMessage id="private_funds" />
                          </h4>
                          <LocalizedLink
                            to={`/asset-management/private-funds/real-estate`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="real-estate" />
                          </LocalizedLink>
                          <LocalizedLink
                            to={`/asset-management/private-funds/multi-assets`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="multi-assets" />
                          </LocalizedLink>
                          <LocalizedLink
                            to={`/asset-management/private-funds/private-equity`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="private-equity" />
                          </LocalizedLink>
                         
                          <LocalizedLink
                            to={`/asset-management/private-funds/venture-capital`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="venture-capital" />
                          </LocalizedLink>
                        </div>
                        <div className="mobile-sub-dropdown-section">
                          <h4>
                            <FormattedMessage id="product-development" />
                          </h4>
                         
                          <LocalizedLink
                            to={`/asset-management/product-development`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="product-development" />
                          </LocalizedLink>
                        </div>
                        <div className="mobile-sub-dropdown-section">
                          <h4>
                            <FormattedMessage id="portfolio-management" />
                          </h4>
                          <LocalizedLink
                            to={`/asset-management/portfolio-management`}
                            onClick={toggleModal}
                          >
                            <FormattedMessage id="portfolio-management" />
                          </LocalizedLink>
                        
                        </div>
                      </div>
                    </div>
                    <LocalizedLink
                      to={`/Investment-banking`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="investment_banking" />
                    </LocalizedLink>
                    <LocalizedLink
                      to={`/conservation-services`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="conservation_services" />
                    </LocalizedLink>
                    <LocalizedLink
                      to={`/advisory-research`}
                      onClick={toggleModal}
                    >
                      <FormattedMessage id="advisory_research" />
                    </LocalizedLink>
                  </div>
                </div>
                <LocalizedLink to={`/announcements`} target="_blank" onClick={toggleModal}>
                  <FormattedMessage id="announcements" />
                </LocalizedLink>
                <LocalizedLink to={`/reports`} onClick={toggleModal}>
                  <FormattedMessage id="reports" />
                </LocalizedLink>
                <LocalizedLink to={`/client-awareness`} onClick={toggleModal}>
                  <FormattedMessage id="client_awareness" />
                </LocalizedLink>
                <LocalizedLink to={`/gallery`} onClick={toggleModal}>
                  <FormattedMessage id="Media_center" />
                </LocalizedLink>
                <LocalizedLink to={`/careers`} onClick={toggleModal}>
                  <FormattedMessage id="careers" />
                </LocalizedLink>
              
                <LocalizedLink to={`/contact-us`} onClick={toggleModal}>
                  <FormattedMessage id="contact_us" />
                </LocalizedLink>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="login-mob">
                <LocalizedLink to={`/Individuals-login`} onClick={toggleModal}>
                  <button>
                    <FormattedMessage id="open_new_account" />
                  </button>
                </LocalizedLink>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </header>
  )
}

export default Header
