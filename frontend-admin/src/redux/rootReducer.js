// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import auth from "./auth";
import message from "./message";
import kategori from "./kategori"
import lokasi from "./lokasi"
import laboratorium from "./laboratorium"
import alat from "./alat"
import profile from "./profile"
import pages from "./pages"
import user from "./user"



const rootReducer = {
  navbar,
  layout,
  auth,
  message,
  kategori,
  lokasi,
  laboratorium,
  alat,
  profile,
  pages,
  user,
  
};

export default rootReducer;
