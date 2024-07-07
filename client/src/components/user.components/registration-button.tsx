import { Status } from "../../utils";
import { Button } from "../ui/button";

type Props = {
    status?: Status;
};
export const RegistrationButton = ({ status = Status.NONE }: Props) => {
    return (
        <div className='flex justify-end gap-4'>
            {(status === Status.DRAFT || status === Status.DISCARDED) && (
                <Button size='lg' variant='danger'>
                    DELETE
                </Button>
            )}
            {(status === Status.SUBMITTED ||
                status === Status.DECLINED ||
                status === Status.APPROVED) && (
                <Button size='lg' variant='outline'>
                    DISCARD
                </Button>
            )}
            {status === Status.APPROVED && (
                <Button size='lg' variant='blue'>
                    START LEARNING
                </Button>
            )}
            {status === Status.APPROVED && (
                <Button size='lg' variant='success'>
                    DONE
                </Button>
            )}
            {(status === Status.SUBMITTED || status === Status.DECLINED) && (
                <Button size='lg' variant='edit'>
                    EDIT
                </Button>
            )}
            {(status === Status.NONE || status === Status.DRAFT) && (
                <Button type='submit' size='lg' variant='success'>
                    SUBMIT
                </Button>
            )}
        </div>
    );
};
