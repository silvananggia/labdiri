import React, { Suspense, lazy } from "react";
import { Routes, Route } from 'react-router-dom';
import Spinner from '../components/Spinner/Loading-spinner';

// Use lazy for importing your components
const Home = lazy(() => import('../components/Home'));
const Laboratorium = lazy(() => import('../components/Laboratorium'));
const LaboratoriumDetail = lazy(() => import('../components/LaboratoriumDetail'));
const Alat = lazy(() => import('../components/Alat'));
const AlatDetail = lazy(() => import('../components/AlatDetail'));
const Layanan = lazy(() => import('../components/Layanan'));
const Hubungikami = lazy(() => import('../components/HubungiKami'));
const VisiMisi = lazy(() => import('../components/VisiMisi'));
const TentangKami = lazy(() => import('../components/TentangKami'));
const StrukturOrganisasi = lazy(() => import('../components/StrukturOrganisasi'));
const NotFound = lazy(() => import('../components/NotFound'));

function MyRouter() {
    return (
        <Routes>
            <Route path='/' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Home />
                </Suspense>
            } />
            <Route path='/tentang-kami' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <TentangKami />
                </Suspense>
            } />
            <Route path='/visi-misi' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <VisiMisi />
                </Suspense>
            } />
            <Route path='/struktur-organisasi' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <StrukturOrganisasi />
                </Suspense>
            } />
            <Route path='/laboratorium' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Laboratorium />
                </Suspense>
            } />
            <Route path='/laboratorium-kategori/:code' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Laboratorium />
                </Suspense>
            } />
            <Route path='/laboratorium/:code' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <LaboratoriumDetail />
                </Suspense>
            } />
            <Route path='/alat-lab' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Alat />
                </Suspense>
            } />
            <Route path='/alat-lab/:code' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <AlatDetail />
                </Suspense>
            } />
            <Route path='/layanan' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Layanan />
                </Suspense>
            } />
            <Route path='/hubungi-kami' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <Hubungikami />
                </Suspense>
            } />
            <Route path='*' element={
                <Suspense fallback={<Spinner className="content-loader" />}>
                    <NotFound />
                </Suspense>
            } />
        </Routes>
    );
}

export default MyRouter;
