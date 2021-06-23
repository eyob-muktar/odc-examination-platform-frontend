import { Layout as ReactLayout} from 'react-admin'

import MyAppBar from '../components/myAppBar'
import myMenu from '../components/myMenu'
import mySidebar from '../components/mySidebar'

// eslint-disable-next-line react/react-in-jsx-scope
const Layout = props => <ReactLayout 
  {...props}
  appBar={MyAppBar }
  sidebar={mySidebar}
  menu={myMenu}
/>

export default Layout