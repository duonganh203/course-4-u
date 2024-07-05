import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../utils/customizeAxios";
import { RegistrationsForm } from "../form/registration-form";
import { z } from "zod";
import { cn } from "../../utils/utils";
import { courseSchema } from "../../schemas/course-schema";
import { Status } from "../../utils";

export type RegistrationsProps = {
    id?: number;
    duration?: number;
    durationUnit?: "DAY" | "WEEK" | "MONTH";
    status?: Status;
    course?: z.infer<typeof courseSchema>;
};
type Props = {
    className?: string;
};
const Registrations = ({ className }: Props) => {
    const id = useLocation().pathname.split("/")[2];
    const [registration, setRegistration] = useState<RegistrationsProps | null>(
        null
    );
    useEffect(() => {
        const getDetailRegistration = async () => {
            if (!id) return;
            await instance.get(`/registrations/${id}`).then((res) => {
                console.log(res.data);
                setRegistration(res.data);
            });
        };
        getDetailRegistration();
    }, [id]);
    return (
        <div
            className={cn(
                "w-[1352px] pt-5 pb-10 px-10 flex flex-col items-center gap-5 rounded-[30px] mx-auto my-8 border-gray-300 border-2",
                className
            )}
        >
            <h2 className='text-[#1E293B] text-[40px] tracking-tighter leading-8 font-semibold font-inter'>
                Detail of registration
            </h2>
            <RegistrationsForm
                id={+id}
                duration={id ? registration?.duration : undefined}
                durationUnit={id ? registration?.durationUnit : undefined}
                status={id ? registration?.status : undefined}
                course={id ? registration?.course : undefined}
            />
        </div>
    );
};

export default Registrations;
