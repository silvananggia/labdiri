// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='me-50' />
          <span className='fw-bold'>Profil</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Lock size={18} className='me-50' />
          <span className='fw-bold'>Visi & Misi</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Bookmark size={18} className='me-50' />
          <span className='fw-bold'>Tugas & Fungsi</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Bell size={18} className='me-50' />
          <span className='fw-bold'>Struktur Organisasi</span>
        </NavLink>
      </NavItem>

    </Nav>
  )
}

export default Tabs
