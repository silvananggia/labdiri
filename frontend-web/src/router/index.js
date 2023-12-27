import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Home from '../components/Home';

import Laboratorium from '../components/Laboratorium';
import LaboratoriumDetail from '../components/LaboratoriumDetail';
import Alat from '../components/Alat';
import AlatDetail from '../components/AlatDetail';
import Layanan from '../components/Layanan';
import Hubungikami from '../components/HubungiKami';
import VisiMisi from '../components/VisiMisi';
import TentangKami from '../components/TentangKami';
import StrukturOrganisasi from '../components/StrukturOrganisasi';

function MyRouter(){
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tentang-kami' element={<TentangKami />} />
            <Route path='/visi-misi' element={<VisiMisi />} />
            <Route path='/struktur-organisasi' element={<StrukturOrganisasi />} />
            <Route path='/laboratorium' element={<Laboratorium />} />
            <Route path='/laboratorium-kategori/:code' element={<Laboratorium />} />
            <Route path='/laboratorium/:code' element={<LaboratoriumDetail />} />
            <Route path='/alat-lab' element={<Alat />} />
            <Route path='/alat-lab/:code' element={<AlatDetail />} />
            <Route path='/layanan' element={<Layanan />} />
            <Route path='/hubungi-kami' element={<Hubungikami />} />
            
           
       

        </Routes>

    )
}

export default MyRouter;