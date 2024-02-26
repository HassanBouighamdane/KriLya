function Footer(){
    return(
        <div className="bg-blue-950 text-white py-10 ">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="md:order-1">
        <h4 className="text-center md:text-left">Contact</h4>
          <p className="text-center md:text-left">Right Section</p>
        </div>

        
        <div className="md:order-2">
        <h4 className="text-center md:text-left">Contact</h4>
          <p className="text-center md:text-left">Left Section</p>
          <h4 className="text-center md:text-left">Adress</h4>
          <p className="text-center md:text-left">Left Section</p>
        
        </div>
      </div>
    </div>
    )
}
export default Footer