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
                    `https://strong-nest-c09ad17fab.strapiapp.com/api/pages/?filters[custom_slug][$eq]=board&locale=${currentLocale}&populate[sections][populate][section_content][populate][Board_of_Directors_card][populate]=*&populate=image`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ded7a84db35ddadb21917aee44f2a073f4880baf20dbf06abd375eb7276de560be2999b1ba9a092fa46e45b970d891af83521cbb874bb2d2a09a526e80313d2d947e72c0079252ec76592b13fbd33c1729a2943f857f163033c4f7384072d032520f41c2368cd207187c10b9a28796a75678d8cb38ed50b6f37d7e73251c5b68'
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