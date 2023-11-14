import "./asset/css/index.scss";
import { Route , Switch ,Redirect ,BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import { DataContext } from './components/data/datacontext';
import { useContext, useEffect } from 'react';
import Header from "./components/header/header";
import SideBar from "./components/side-bar/side-bar";
import WelcomeName from "./components/welcome-name/welcome-name";
import MakeLeadPackPage from "./components/make-lead-pack/make-lead-pack";
import LeadsPage from "./components/leades/leads";
import SingleLead from "./components/single-lead/single-lead";

function App() {
  const { user } = useContext(DataContext);

  return (
    <BrowserRouter>
    <Header user={user}/>
    <div className="page-wrapper">
          <SideBar />
          <div className="main-content mm-width">
            <WelcomeName user={user}/>
            <Switch>
               <Route path="/make-lead-pack" exact component={MakeLeadPackPage} />
               <Route path="/my-leads" exact component={LeadsPage} />
               <Route path="/lead/:id" exact component={SingleLead} />
               <Route path="/not-found" component={MakeLeadPackPage} />
               <Redirect to="/not-found" />
              {/*
              <Route path="/jalasat/:id" component={JalasatPage} />
              <Route path="/my-courses" exact component={MYCourses} />
              <Route path="/jalasat" exact component={JalasatPage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/guides" exact component={GuidePage} />
              <Route path="/dashboard" exact component={DashboardPage} />
              <Route path="/shop" exact component={ShopPage} />
              <Route path="/cart" exact component={CartPage} />
                */}
            </Switch>
          </div>
        </div>
      
    </BrowserRouter>
  );
}

export default App;
