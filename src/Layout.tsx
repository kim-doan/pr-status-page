import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <Page>
    <Section>{children}</Section>
  </Page>
);

const Page = styled.div`
  height: 100%;
  padding-top: 40px;
`;

const Section = styled.section`
  display: flex;
  height: 100%;
`;

export default Layout;
