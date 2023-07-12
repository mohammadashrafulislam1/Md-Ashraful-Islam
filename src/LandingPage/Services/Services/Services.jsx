const Services = () => {
    return (
    <div className="md:flex">
        <div>
          <div className="flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5  p-5 mb-5">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/male-programmer-5743382-4846824.png" alt="" className="w-[100px]"/>
            <div>
                <h6 className="text-white text-xl font-semibold">Full Stack Development</h6>
                <p className="text-[#616161]">Professional front-end and back-end developer.</p>
            </div>
          </div> 

          <div className="flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5  p-5">
            <img src="https://static.vecteezy.com/system/resources/previews/008/506/577/original/3d-seo-search-engine-optimization-concept-png.png" alt="" className="w-[100px]"/>
            <div>
                <h6 className="text-white text-xl font-semibold">SEO OPTIMIZATION</h6>
                <p className="text-[#616161]">Have experience in search engine optimization.</p>
            </div>
          </div>  

          <div className="flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5  p-5 mt-5">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/graphic-design-6332596-5220374.png" alt="" className="w-[100px]"/>
            <div>
                <h6 className="text-white text-xl font-semibold">WEB DESIGN</h6>
                <p className="text-[#616161]">Familiar with web design and designing tools</p>
            </div>
          </div>
        </div>  
    </div>
    );
};

export default Services;