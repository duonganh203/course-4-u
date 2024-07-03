import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../utils/customizeAxios";
import { RegistrationsForm } from "../form/registration-form";
import { z } from "zod";
import { registrationSchema } from "../../schemas/registration-schema";

type RegistrationsProps = z.infer<typeof registrationSchema> & {
    id?: number;
};

const Registrations = () => {
    const id = useLocation().pathname.split("/")[2];
    const [registration, setRegistration] = useState<RegistrationsProps | null>(
        null
    );
    useEffect(() => {
        instance.get(`/registrations/${id}`).then((res) => {
            console.log(res.data);
            setRegistration(res.data);
        });
    }, [id]);
    return (
        <div className='w-[1352px] pt-5 pb-10 px-10 flex flex-col items-center gap-5 rounded-[30px] mx-auto my-8 border-gray-300 border-2'>
            <h2 className='text-[#1E293B] text-[40px] tracking-tighter leading-8 font-semibold font-inter'>
                Detail of registration
            </h2>
            <RegistrationsForm
                id={+id}
                duration={registration?.duration}
                durationUnit={registration?.durationUnit}
                level={"BEGINNER"}
                link={registration?.link}
            />
        </div>
    );
};

export default Registrations;
