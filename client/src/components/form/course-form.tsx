import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import MultipleSelector, { Option } from "../ui/multi-selected";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { CropThumbnail } from "../user.components/crop-thumbnail";
type Props = {
    form?: any;
};

const categoryOptions: Option[] = [
    { label: "Java", value: "java", disable: true },
    { label: "React", value: "react" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember", disable: true },
    { label: "Gatsby", value: "gatsby", disable: true },
    { label: "Astro", value: "astro" },
];
type Thumbnail = {
    imageUrl: string | null;
    croppedImageUrl: string | null;
};
const initData: Thumbnail = {
    imageUrl: null,
    croppedImageUrl: null,
};
export const CourseForm = ({ form }: Props) => {
    const [thumbnail, setThumbnail] = useState<Thumbnail>(initData);
    const [isOpen, setIsOpen] = useState(false);

    const onDrop = useCallback((acceptedFiles: FileList) => {
        // Do something with the files
        const file = new FileReader();
        file.onload = () => {
            setThumbnail({ ...thumbnail, imageUrl: file.result as string });
            form.setValue("thumbnail", file.result as string);
            setIsOpen(true);
        };

        file.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            //@ts-ignore
            onDrop,
            accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
            },
            maxSize: 10 * 1024 * 1024,
        });
    const onDeleteImage = () => {
        setThumbnail({ ...thumbnail, imageUrl: null });
        form.setValue("thumbnail", "");
    };
    const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
        const newThumbnail = {
            ...thumbnail,
            crop,
            zoom,
            aspect,
            croppedImageUrl,
        };
        setThumbnail(newThumbnail);
        form.setValue("thumbnail", croppedImageUrl);
        setIsOpen(false);
    };
    return (
        <>
            <div>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Course Name{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Course Name'
                                    {...field}
                                    className='w-full'
                                    maxValue={80}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='teacherName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Teacher Name{""}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Teacher Name'
                                    {...field}
                                    className='w-full'
                                    maxValue={80}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='link'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Course Link{" "}
                                <span className='text-red-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Course Link'
                                    {...field}
                                    className='w-full'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex items-stretch gap-6'>
                <div className='w-[60%] flex justify-between flex-col'>
                    <div className='flex gap-4'>
                        <FormField
                            control={form.control}
                            name='platform'
                            render={({ field }) => (
                                <FormItem className='w-[50%]'>
                                    <FormLabel>Platform</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a platform to this course' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='Coursera'>
                                                Coursera
                                            </SelectItem>
                                            <SelectItem value='Udemy'>
                                                Udemy
                                            </SelectItem>
                                            <SelectItem value='Pluralsight'>
                                                Pluralsight
                                            </SelectItem>
                                            <SelectItem value='Edx'>
                                                Edx
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='level'
                            render={({ field }) => (
                                <FormItem className='w-[50%]'>
                                    <FormLabel>Level</FormLabel>
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
                                            <SelectItem value='BEGINNER'>
                                                Beginner
                                            </SelectItem>
                                            <SelectItem value='INTERMEDIATE'>
                                                Intermediate
                                            </SelectItem>
                                            <SelectItem value='ADVANCED'>
                                                Advanced
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='category'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        {...field}
                                        defaultOptions={categoryOptions}
                                        placeholder='Select category you like...'
                                        creatable={true}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='w-[40%] flex gap-4 items-center'>
                    {thumbnail.imageUrl ? (
                        <CropThumbnail
                            imageUrl={thumbnail.imageUrl}
                            cropInit={thumbnail.crop}
                            zoomInit={thumbnail.zoom}
                            aspectInit={thumbnail.aspect}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setCroppedImageFor={setCroppedImageFor}
                        >
                            <div className='w-[228px] h-[192px] cursor-pointer'>
                                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 h-[19px]'>
                                    Thumbnail
                                </label>
                                <img
                                    src={
                                        thumbnail.croppedImageUrl ||
                                        thumbnail.imageUrl
                                    }
                                    alt='thumbnail'
                                    className='object-cover max-w-[228px] w-[228px] h-[160px] rounded-xl mt-[8px]'
                                />
                            </div>
                        </CropThumbnail>
                    ) : (
                        <FormField
                            control={form.control}
                            name='thumbnail'
                            render={({ field }) => (
                                <FormItem className='w-full h-full'>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <div
                                            className='flex flex-col justify-center items-center w-[228px] h-[160px] px-[52px] py-[18px] border-dashed border-[#D9D9D9] hover:border-[#c1e2ff] border-2 rounded-xl cursor-pointer group '
                                            {...getRootProps()}
                                        >
                                            <Input
                                                {...field}
                                                className='bg-transparent'
                                                type='file'
                                                value={undefined}
                                                {...getInputProps()}
                                            />

                                            <div className='flex justify-center items-center p-3 border border-black rounded-full w-fit group-hover:border-[#96ceff] group-hover:text-[#4fadff]'>
                                                <Upload
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                            <h4 className='text-base font-semibold group-hover:text-[#4fadff] text-center'>
                                                {isDragActive
                                                    ? "Drop it here..."
                                                    : "Choose a file or drag it here"}
                                            </h4>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <div className='flex flex-col gap-5'>
                        <p className='text-[#6E7485] text-sm'>
                            Upload your course Thumbnail here. Important
                            <b> guidelines</b>: 1200x800 pixels or 12:8 Ratio.
                            Supported format: <b>.jpg, .jpeg, or .png</b>
                        </p>
                        <Button
                            className='text-[#861FA2] bg-violet-600/20 hover:bg-violet-100 translate-y-6'
                            disabled={!thumbnail.imageUrl}
                            type='button'
                            onClick={onDeleteImage}
                        >
                            Delete Image
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
