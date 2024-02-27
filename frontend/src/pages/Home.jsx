import logo from "../images/logo.png"
function Home(){
    return(
        <div className=" flex justify-center items-center">
    <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="logo" />
        <p className="text-center ">Do you need to use items in a short time? You are in the right place</p>
    </div>
</div>

    )
}
export default Home