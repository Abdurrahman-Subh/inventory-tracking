import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";
import "./sidebar.css";
import styled from "styled-components";
const MainContainer = styled.div`
  display: flex;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;
const Icon = styled.div``;
const routes = [
  {
    path: "/yeni-kayit",
    name: "Sipariş Oluştur",
    icon: <FaHome />,
  },
  {
    path: "/bekleyen-siparişler",
    name: "Bekleyen Siparişler",
    icon: <FaUser />,
  },

  {
    path: "/tamamlanan-sipraişler",
    name: "Tamamlanan Sipraişler",
    icon: <BiAnalyse />,
  },
];
const Section = styled.section`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Bars = styled.div`
  width: 30px;
  cursor: pointer;
`;

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <MainContainer>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <TopSection>
            <Bars>
              <FaBars onClick={toggle} />
            </Bars>
          </TopSection>

          <Section>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <Icon>{route.icon}</Icon>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </Section>
        </motion.div>

        <main>{children}</main>
      </MainContainer>
    </>
  );
};

export default SideBar;
