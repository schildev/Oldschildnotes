'use client'
import Link from "next/link";
const NavbarLinks = () => {
    return (
        <div className={"flex gap-3 md:gap-5 order-1 items-center md:order-2 m-0 md:basis-2/12 lg:basis-1/12 justify-end md:justify-center"}>
    <Link className={"text-lg grow-0 text-white flex items-center"} href={"/"}>
        <span className={"material-symbols-outlined text-2xl"}>
            cottage
        </span>
    </Link>
    <Link className={"text-lg grow-0 text-white flex items-center"} href={"/notes/create"}>
    <span className="material-symbols-outlined text-2xl">
        note_add
    </span>
    </Link>
</div>
    );
}
 
export default NavbarLinks;