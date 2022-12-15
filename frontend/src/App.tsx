import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import {  ApiLoader } from 'components';
import { withProviders } from 'hocs';

import GlobalStyle from "./utils/GloablStyle";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;
  return<>
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      <GlobalStyle />
    </>
  ;
}

export const App = withProviders(Component);
