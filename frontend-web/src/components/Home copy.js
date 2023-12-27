import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";


import CarouselHome from "./Home/CarouselHome";


function Home() {
  return (

    <div>

      <section className="section2">
        <div className="rect1"></div>
        <CarouselHome />
      </section>
      <section className="section3">
            <div className="box2">
                <div className="wrapper3">

                    <div className="wrapper4">

                        <div className="text1">Kategori Laboratorium</div>
                        <div className="line"></div>
                    </div>
                    <div className="wrapper5">
                        
                    </div>
                </div>
            </div>
        </section>

      <section className="section4">
        <div className="wrapper">
          <div className="wrapper1">
            <img
              className="icon"
              src="./assets/d64f8b2165498252d52d004e7ea06d48.png"
              alt="alt text"
            />
            <h5 className="highlight">Laboratorium</h5>
            <div className="rect"></div>
          </div>
        </div>
        <a href="Laboratorium.html">
          <button className="box">
            <div className="text">LIHAT SELENGKAPNYA</div>
          </button>
        </a>
        <div className="rect3"></div>
        <div className="rect31"></div>
        <div className="rect32"></div>
        <div className="wrapper13">
          <a href="LaboratoriumDetail.html">
            <h5 className="wrapper131">Laboratorium Bioindustri Laut</h5>
          </a>
        </div>
        <div className="wrapper14">
          <div className="wrapper15">
            <div className="wrapper151">Kawasan Sains Kurnaen Sumadiharga</div>
          </div>
          <div className="wrapper152">
            <div className="wrapper153">Lombok</div>
          </div>
        </div>
        <div className="wrapper16">
          <h5 className="wrapper161">
            Laboratorium Bahan Bakar dan Rekayasa Desain
          </h5>
        </div>
        <div className="wrapper141">
          <div className="wrapper15">
            <div className="wrapper154">
              Kawasan Sains dan Teknologi BJ. Habibie Serpong
            </div>
          </div>
          <div className="wrapper152">
            <div className="wrapper155">Tangerang Selatan</div>
          </div>
        </div>
        <div className="wrapper162">
          <h5 className="wrapper161">Laboratorium Pantai dann Dinamika Pantai</h5>
        </div>
        <div className="wrapper17">
          <div className="wrapper156">
            <div className="wrapper157">D.I. Yogyakarta</div>
          </div>
        </div>
        <div className="box6">
          <div className="text3">Populer</div>
        </div>
        <div className="box61">
          <div className="text3">Populer</div>
        </div>
        <div className="box62">
          <div className="text3">Populer</div>
        </div>
      </section>

      <section className="section5">

            <div className="wrapper2">
                <div className="wrapper1">
                    <img className="icon" src="./assets/d64f8b2165498252d52d004e7ea06d48.png" alt="alt text" />
                    <h5 className="highlight1">Alat Laboratorium</h5>
                    <div className="rect"></div>
                </div>
            </div>
            <a href="Peralatan.html">
            <button className="box1" >
                <div className="text">LIHAT SELENGKAPNYA</div>
            </button>
        </a>
            <div className="rect4"></div>
            <div className="rect41"></div>
            <div className="rect42"></div>
            <div className="rect43"></div>
            <div className="wrapper132">
                <a href="PeralatanDetail.html">
                <h5 className="wrapper131">High Performance <br />Liquid Chromatography ( HPLC )</h5></a>
            </div>
            <div className="wrapper142">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper133">
                <h5 className="wrapper131">Gas Chromatography ( GC )</h5>
            </div>
            <div className="wrapper143">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper134">
                <h5 className="wrapper131">Multimode Microplate Reader</h5>
            </div>
            <div className="wrapper144">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper135">
                <h5 className="wrapper131">Water Purification System</h5>
            </div>
            <div className="wrapper145">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="rect44"></div>
            <div className="rect45"></div>
            <div className="rect46"></div>
            <div className="rect47"></div>
            <div className="wrapper136">
                <h5 className="wrapper131">High Performance <br />Liquid Chromatography ( HPLC )</h5>
            </div>
            <div className="wrapper146">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper137">
                <h5 className="wrapper131">Gas Chromatography ( GC )</h5>
            </div>
            <div className="wrapper147">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper138">
                <h5 className="wrapper131">Multimode Microplate Reader</h5>
            </div>
            <div className="wrapper148">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="wrapper139">
                <h5 className="wrapper131">Water Purification System</h5>
            </div>
            <div className="wrapper149">

                <div className="wrapper15">
                    <div className="wrapper158">Kawasan Sains Kurnaen Sumadiharga,</div>
                </div>
                <div className="wrapper152">
                    <div className="wrapper153">Lombok</div>
                </div>
            </div>
            <div className="box63">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box64">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box65">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box66">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box67">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box68">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box69">
                <div className="text3">Terbaru</div>
            </div>
            <div className="box610">
                <div className="text3">Terbaru</div>
            </div>
        </section>

        <section className="section6">
            <div className="wrapper25">

                <div className="wrapper18">
                    <img className="icon" src="./assets/ebdeac6cb5c5e658f02a51d475177ee4.png" alt="alt text" />
                    <h5 className="highlight2">Mitra</h5>
                    <div className="rect"></div>
                </div>
                <div className="wrapper26">
                    <div className="box9">
                        <img className="icon1" src="./assets/ebdeac6cb5c5e658f02a51d475177ee4.png" alt="alt text" />
                    </div>
                    <img className="image5" src="./assets/bde909c7ba9d82ee60ebab61f6eaa11d.png" alt="alt text" />
                    <div className="box91">
                        <img className="icon2" src="./assets/ebdeac6cb5c5e658f02a51d475177ee4.png" alt="alt text" />
                    </div>
                </div>
            </div>

            
</section>
    </div>
  );
}

export default Home;
