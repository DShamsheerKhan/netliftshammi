import React, { useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import ScrollToTopButton from '../components/ScrollToTopButton';
import Hero from '../components/Hero';
import "../components/style/Team.css";
import Layout from "../components/layout";
import Seo from '../components/seo';
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import { useLocalization } from '../context/LocalizationContext';
import Loader from '../components/loader';
import { LocalizedLink } from '../components/LocalizedLink';
const Team = ({ pageContext }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug');
    const { locale } = useLocalization();
    const currentLocale = pageContext.locale || locale;

    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://reports.itqancapital.com/api/pages/?filters[custom_slug][$eq]=board&locale=${currentLocale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer d669ad6366aa64f56773be0483825f4c484c013463b9747662f0dee6fe068c486286209e0ddf7210dadcb668fa2a9315793ae3c9d22f8047a5748eeb148d4e6556287f972c9a5c5c94f9c16fa42678d6ced8c78bc5e5463a329f0c0eebcf4514ede98fc323e5acfc03ed6593f69f648d531b39c3efe6db04c71527d5030db760',
                        },
                    }
                );
                const data = await response.json();
                setPageData(data.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentLocale]);

    if (loading) {
        return <Loader/>;
    }

    if (!pageData) {
        return <p><FormattedMessage id="notFoundMessage" /></p>;
    }

    const sections = pageData.attributes.sections.data;
    const heroSection = sections.find(section => section.attributes.section_content[0].__component === "blocks.hero-section");
    const boardSection = sections.find(section => section.attributes.section_content[0].__component === "blocks.itqan-capital-members");

    const teamMember = boardSection?.attributes.section_content[0].Board_of_Directors_card.find(member => member.slug === slug);

    if (!teamMember) {
        return <p><FormattedMessage id="notFoundMessage" /></p>;
    }

    const profileImageUrl = teamMember.image?.data?.attributes?.formats?.small?.url
        ? `${teamMember.image.data.attributes.formats.small.url}`
        : '/default-profile.png';

    return (
        <Layout>
            <Seo
                title={`فريق إتقان - ${teamMember.name} - شركة إتقان كابيتال`}
                description={teamMember.subtitle}
            />
            <ScrollToTopButton />
            <Hero title={heroSection?.attributes.section_content[0].title} />
            <section className='Team-sec'>
                <div className='Team-container'>
                    <LocalizedLink to={`/board`}><button><FormattedMessage id="backButton" /><img src='/RA.png' alt="RA" /></button></LocalizedLink>
                    <div className='Team-card'>
                        <img src={profileImageUrl} alt={teamMember.name} />
                        <div className='Team-card-info'>
                            <h4>{teamMember.name}</h4>
                            <p>{teamMember.position}</p>
                            <p>{teamMember.subtitle}</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Team;