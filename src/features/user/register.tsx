import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { Button, Link } from "@nextui-org/react"
import { useRegisterMutation } from "../../app/services/userApi"
import { ErrorMessage } from "../../components/error-message"
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from "react"

export type Register = {
    email: string
    name: string
    password: string
}

type Props = {
    setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
    const {
        register: refisterForm,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Register>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    })

    const [ register ] = useRegisterMutation()
    const [error, setError] = useState("")

    const onSubmit = async (data: Register) => {
        try {
            await register(data).unwrap()
            setSelected("login")
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            }
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                control={control}
                required="Обязательное поле"
                label="Имя"
                name="name"
            />
            <Input
                control={control}
                label="Email"
                type="email"
                required="Обязательное поле"
                {...refisterForm("email", {
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Введённое значение не соответствует формату email",
                    },
                })}
            />
            <Input
                control={control}
                name="password"
                label="Пароль"
                type="password"
                required="Обязательное поле"
            />
            <ErrorMessage error={error} />

            <p className="text-center text-small">
                Уже есть аккаунт?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("login")}
                >
                    Войдите
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}