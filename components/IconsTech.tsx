import React from 'react'
import Image from 'next/image'
import {cn, getTechLogos} from "@/lib/utils";

const IconsTech = async ({techStack}: TechIconProps) => {


    const urlIcons = await getTechLogos(techStack);

    return (
        <div className="flex flex-row justify-center items-center">

            {urlIcons.slice(0, 3).map(({tech, url}, index) => (
                <div key={index}
                     className={cn("relative group rounded-full bg-gray-700 p-2", index >= 1 && "-ml-4")}>
                    <p className="tech-tooltip text-[9px]">{tech}</p>
                    <Image src={url} alt={tech} width={20} height={20}/>
                </div>
            ))}


        </div>
    )
}
export default IconsTech
