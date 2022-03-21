import React from "react";

type State = {
    error: string
    name: string,
    formState: {
        [color: string]: string,
    },
    updateFormState: (name:string, value:string) => void,
    updateErrors: (name:string, value:string) => void
}

const FormInput = (props: State) => {
    
    const {error, name, formState, updateFormState, updateErrors} = props
    
    return(
        <>
        <input 
            type="text" 
            value={formState[name]}
            name={name}
            placeholder={name}
            className={error ? 'invalid': ''}
            onChange={(e) => {
                const value = e.target.value;
                if(value.length<=3 && (parseInt(value) <= 256 || !value)){
                    updateFormState(e.target.name, value);
                    updateErrors(e.target.name, '')
                    if(!value){
                        updateErrors(e.target.name, 'no value')
                    }
                }else if(value.length>3){
                    updateErrors(e.target.name, 'too many characters')
                }else{
                    updateFormState(e.target.name, value);
                    updateErrors(e.target.name, 'invalid content')
                }
            }}/>
        <span className="error-span">{error}</span>
        </>
    )
}

export default FormInput;