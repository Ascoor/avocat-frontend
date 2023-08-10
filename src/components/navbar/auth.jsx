import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import AuthRoutes from '../auth/AuthRoutes';
import DrawerHeader from './DrawerHeader';

import useAuth from "../auth/AuthUser";

<<<<<<< HEAD
const drawerWidth = 240;

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));
=======
import LegcaseList from "../legcase/list.component";
import LegalSession from "../legcase/tools/Legal_session.component";
/**reports**/
import SidebarHeader from "./SidebarHeader";
import ProfileUpdateComponent from "../auth/profile";
import ProcedureSearch from "../reports/procedure_search.component";
import Footer from "./Footer";
import LegCaseCreate from "../legcase/create.component";

import MouseFloat from "../home_tools/FloatingButton";
>>>>>>> 59404359b129b7c8626b38b1bb88a0c360c4b040

const Auth = () => {
  const { token, logout } = useAuth();
  const userId = useAuth().user.id;
  
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
<<<<<<< HEAD
=======
        <div id="content">
>>>>>>> 59404359b129b7c8626b38b1bb88a0c360c4b040
      <TopNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        userId={userId}
        logoutUser={logoutUser}
<<<<<<< HEAD
      />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader handleDrawerClose={handleDrawerClose}/>
        <AuthRoutes />
      </Main>
    </>
=======
        />
    <SidebarHeader />
      <div id="main" style={{ paddingBottom: "16px", minHeight: "calc(100vh - 152px)" }}>

        <Container>
        <MouseFloat/> 

          <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/procedures" element={<ProcedureSearch />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/courts" element={<CourtSetting />} />
                        {/* <Route path="/court_search" element={<CourtSearch />} /> */}
                        <Route path="/lawyer_setting" element={<Lawyers />} />
                        <Route path="/cases_setting" element={<CaseTypeSet />} />
          
                        <Route path="/client/create" element={<AddEditClient />} />
                        <Route path="/client/edit/:id" element={<AddEditClient />} />
                        <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
                        <Route path="/profile/:userId" element={<s />} />
                        <Route path="/legcases" element={<LegcaseList />} />
                        <Route path="/legcases/edit/:id" element={<LegCaseCreate isEditing={true} />} />

        <Route path="/legcases/create" element={<LegCaseCreate isEditing={false} />} />
      
                        <Route path="/home" element={<Home />} />
                        <Route path="/legal_session" element={<LegalSession />} />
                        {/* <Route path="/legal_doc_list" element={<LegalDocList />} /> */}
                        {/* <Route path="/legal_doc_create" element={<LegalDocCreate />} /> */}
                        <Route path="/lawyers/form" element={<LawyersAddEdit />} />
                        </Routes>
                        </Container>
      </div>
    </div>



    <Footer />
  </>
>>>>>>> 59404359b129b7c8626b38b1bb88a0c360c4b040
  );
};

export default Auth;
