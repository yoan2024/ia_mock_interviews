import React from 'react'
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Controller, Control, Path} from "react-hook-form";
import {FieldValues} from "react-hook-form";


interface typesAutorizados<T extends FieldValues> {
    name: Path<T>,
    label: string,
    placeholder?: string,
    type?: "email" | "password" | "name",
    control: Control<T>,
}


const FormField = ({name, label, placeholder, type, control}: typesAutorizados<T>) => {
    return (
        <Controller name={name} control={control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input className="input" placeholder={placeholder} {...field} type={type}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}/>)
}
export default FormField
