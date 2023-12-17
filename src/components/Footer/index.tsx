import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  // FooterContainer,
  Language,
} from "./styles";

// interface SocialLinkProps {
//   href: string;
//   src: string;
// }

const Footer = ({ t }: any) => {
 

  // const SocialLink = ({ href, src }: SocialLinkProps) => {
  //   return (
  //     <a
  //       href={href}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       key={src}
  //       aria-label={src}
  //     >
  //       <SvgIcon src={src} width="25px" height="25px" />
  //     </a>
  //   );
  // };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={4} md={10} sm={12} xs={12}>
              <Language>{t("İletişim")}</Language>
              <Large to="/">{t("Bize Herşeyi Anlatabilirsiniz")}</Large>
              <Para>
                {t(`Herhangi bir sorun var mı? Bize ulaşmaktan çekinmeyin.`)}
              </Para>
              
            </Col>
            <Col lg={4} md={8} sm={12} xs={12}>
              <Title>{t("Politika")}</Title>
              <Large to="/" left="true">
                {t("Gizlilik Politikası")}
              </Large>
              <Large left="true" to="/">
                {t("Kullanım Koşulları")}
              </Large>
            </Col>
            <Col lg={4} md={8} sm={12} xs={12}>
              <Title>{t("Adres")}</Title>
              <Large to="/" left="true">
                {t("Ankara / Türkiye")}
              </Large>
            </Col>
            
            
            
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="140px"
                  height="70px"
                />
              </LogoContainer>
            </NavLink>
            {/* <FooterContainer>
              <SocialLink
                href="#"
                src="github.svg"
              />
              <SocialLink
                href="#"
                src="twitter.svg"
              />
              <SocialLink
                href="#"
                src="linkedin.svg"
              />
              <SocialLink
                href="#"
                src="medium.svg"
              />
             
            </FooterContainer> */}
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default withTranslation()(Footer);
