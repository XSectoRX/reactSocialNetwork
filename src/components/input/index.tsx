import React from "react"
import {Control, useController, UseFormRegister,FieldValues } from "react-hook-form"
import { Input as NextInput } from "@nextui-org/react"
import {Register} from "../../features/user/register";

type Props = {
    name: string
    label: string
    placeholder?: string
    type?: string
    control: Control<any>
    required?: string  | boolean
    endContent?: JSX.Element

}

export const Input: React.FC<Props> = ({
                                           name,
                                           label,
                                           placeholder,
                                           type,
                                           control,
                                           required,
                                           endContent,

                                       }) => {
    const {
        field,
        fieldState: { invalid },
        formState: { errors },
    } = useController({
        name,
        control,
        rules: { required },
    })

    return (
        <NextInput
            id={name}
            label={label}
            type={type}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={`${errors[name]?.message ?? ""}`}
            endContent={endContent}
        />
    )
}