import { Layout, ResetScrollOnRouteChange } from 'components';
import React from 'react';
import Protect from 'react-app-protect';
import 'react-app-protect/dist/index.css';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'assets/styles/App.scss';
import { queryClient } from 'clients/api';
import { Web3Wrapper } from 'clients/web3';
import Path from 'constants/path';
import { AuthProvider } from 'context/AuthContext';
import { DisableLunaUstWarningProvider } from 'context/DisableLunaUstWarning';
import { SuccessfulTransactionModalProvider } from 'context/SuccessfulTransactionModalContext';
// import ConvertVrt from 'pages/ConvertVrt';
import Dashboard from 'pages/Dashboard';
import History from 'pages/History';
import Markets from 'pages/Market';
import MarketDetails from 'pages/MarketDetails';
// import Proposal from 'pages/Proposal';
// import Swap from 'pages/Swap';
// import Vaults from 'pages/Vault';
// import Vote from 'pages/Vote';
// import VoterDetails from 'pages/VoterDetails';
// import VoterLeaderboard from 'pages/VoterLeaderboard';
// import Xvs from 'pages/Xvs';
import { MuiThemeProvider } from 'theme/MuiThemeProvider';

const App = () => (
  <Protect sha512="197b956da94b7f32074c6a94a4ce1218110017c8002bdf488aea0394c4f119984544d2c448ffcd0264baae12ebd44ca59c350ab78807c805d01e9149ac91027c">
    <Web3Wrapper>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider>
          <AuthProvider>
            <SuccessfulTransactionModalProvider>
              <DisableLunaUstWarningProvider>
                <BrowserRouter>
                  <ToastContainer />
                  <Layout>
                    <ResetScrollOnRouteChange />

                    <Switch>
                      <Route exact path={Path.ROOT} component={Dashboard} />

                      <Route exact path={Path.MARKETS} component={Markets} />
                      <Route exact path={Path.MARKET_DETAILS} component={MarketDetails} />
                      <Route exact path={Path.HISTORY} component={History} />

                      {/* <Route exact path={Path.VAULTS} component={Vaults} /> */}
                      {/* <Route exact path={Path.GOVERNANCE} component={Vote} />
                      <Route
                        exact
                        path={Path.GOVERNANCE_LEADER_BOARD}
                        component={VoterLeaderboard}
                      />
                      <Route exact path={Path.GOVERNANCE_ADDRESS} component={VoterDetails} />
                      <Route exact path={Path.GOVERNANCE_PROPOSAL_DETAILS} component={Proposal} />
                      <Route exact path={Path.XVS} component={Xvs} />
                      <Route exact path={Path.CONVERT_VRT} component={ConvertVrt} />
                      <Route exact path={Path.SWAP} component={Swap} /> */}

                      <Redirect to={Path.ROOT} />
                    </Switch>
                  </Layout>
                </BrowserRouter>
              </DisableLunaUstWarningProvider>
            </SuccessfulTransactionModalProvider>
          </AuthProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </Web3Wrapper>
  </Protect>
);

export default App;
