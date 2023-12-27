// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane, Card } from 'reactstrap'


import Tabs from './Tabs'
import Profil from './Profil'


// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }



  return (
    <Fragment>

        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />

            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
<Profil/>
              </TabPane>
              <TabPane tabId='2'>
              <Card>
                  <h1>Test</h1>
                </Card>
              </TabPane>
              <TabPane tabId='3'>
              <Card>
                  <h1>Test</h1>
                </Card>
              </TabPane>
              <TabPane tabId='4'>
              <Card>
                  <h1>Test</h1>
                </Card>
              </TabPane>

            </TabContent>
          </Col>
        </Row>
      
    </Fragment>
  )
}

export default AccountSettings
