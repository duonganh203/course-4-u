import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../schemas/registration-schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CourseForm } from "./course-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
type Props = {
    id?: number;
    name?: string;
    teacherName?: string;
    link?: string;
    level?: string;
    platform?: string;
    category?: string[];
    duration?: number;
    durationUnit?: string;
    thumbnail?: string;
};
export const RegistrationsForm = ({ id }: Props) => {
    const form = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: "",
            teacherName: "",
            link: "",
            level: "BEGINNER",
            platform: "",
            category: [],
            duration: 1,
            durationUnit: "DAYS",
            thumbnail: "",
        },
    });
    function onSubmit(values: z.infer<typeof registrationSchema>) {
        console.log(values);
        console.log(id);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <CourseForm
                    //@ts-ignore
                    form={form}
                />
                <div className='flex w-[60%] pr-4 gap-2'>
                    <FormField
                        control={form.control}
                        name='duration'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>
                                    Duration{" "}
                                    <span className='text-red-500'>*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='Duration'
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(+event.target.value)
                                        }
                                        className=''
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='durationUnit'
                        render={({ field }) => (
                            <FormItem className='w-[100px]'>
                                <FormLabel>Unit</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a level for this course' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='DAYS'>
                                            Days
                                        </SelectItem>
                                        <SelectItem value='WEEKS'>
                                            Weeks
                                        </SelectItem>
                                        <SelectItem value='MONTHS'>
                                            Months
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex justify-end'>
                    <Button type='submit' size='lg' variant='success'>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
