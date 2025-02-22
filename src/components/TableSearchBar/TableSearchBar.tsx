import {SearchBar} from "@yourssu/design-system-react";
import {StyledSearchBarContainer} from "@/components/TableSearchBar/TableSearchBar.style.ts";
import {useFormContext} from "react-hook-form";

const TableSearchBar = () => {
    const {register} = useFormContext();

    return  <StyledSearchBarContainer>
        <SearchBar>
            <SearchBar.Input
                {...register("search")}
                placeholder="이름 혹은 닉네임으로 검색"
            />
        </SearchBar>
    </StyledSearchBarContainer>
}

export default TableSearchBar;