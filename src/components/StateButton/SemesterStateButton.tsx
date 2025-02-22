import {StateButton} from "./StateButton";
import {useGetSemesters} from "@/hooks/useGetSemesters.ts";

export const SemesterStateButton = ({
                                        selectedValue,
                                        onStateChange,
                                    }: {
    selectedValue: string;
    onStateChange: (value: string) => void;
}) => {
    const {data: semesters} = useGetSemesters();
    const options = semesters.map(semester => ({label: semester.semester}));

    return (
        <StateButton
            options={options}
            selectedValue={selectedValue}
            onSelect={onStateChange}
            variant="outlined"
        />
    );
};
