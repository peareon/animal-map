import { useState } from "react"
import { useDispatch } from "react-redux"
import { getScienfiticName } from "../../redux/slices/gemini.slice";
import { Form } from "./styles";

const SearchBar = () =>{
    
    const [formValue, setFormValue] = useState('')
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        const {value} = e.target;
        setFormValue(value);
        console.log(value)
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(getScienfiticName(formValue));
    };

    return(
        <>
            <Form action="submit" onSubmit={(e)=>handleSubmit(e)}>
                <input placeholder="De qué especie quieres saber?" type="text" name="animal" value={formValue} onChange={(e)=>handleChange(e)} />
                <button>Buscar</button>
            </Form>
        </>
    )
};

export default SearchBar;