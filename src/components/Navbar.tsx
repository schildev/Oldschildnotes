import Link from "next/link";
import {Rowdies} from "next/font/google";
import SearchForm from "./SearchForm";
import NavbarLinks from "./NavbarLinks";
const RowdiesFont = Rowdies({subsets:["latin"], weight:"400"});
const Navbar = () => {
    return (
        <header className={"bg-indigo-500 border-b shadow-md shadow-violet-300/50 py-3 align-center justify-start gap-3 border-violet-600"}>
                <div className={"mx-2 flex-wrap  md:flex-nowrap items-center flex justify-between  md:justify-end gap-3 text-sky-100"}>
                <h2 className={"flex basis-8/12 md:basis-4/12 lg:basis-3/12 justify-start md:justify-center items-center text-3xl text-start " + RowdiesFont.className}>Schildnotes</h2>
                    <SearchForm />
                    <NavbarLinks />
                </div>
        </header>
    );
}
 
export default Navbar;