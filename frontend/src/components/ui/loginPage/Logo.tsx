import logo from "../../../assets/appLogo.svg";

export function Logo() {
  return (
    // <div className='flex flex-col'>
    //   <h1 className='font-bold text-green-500 text-8xl uppercase leading-[0.7] text-center'>
    //     Tree
    //   </h1>
    //   <h1 className='font-bold text-green-500 text-8xl uppercase leading-[0.7] text-center'>
    //     Notes
    //   </h1>
    // </div>
    <div className="flex justify-center lg:-mr-52">
      <img src={logo} />
    </div>
  );
}
