import { FormEventHandler } from 'react'
import './Form.scss'

type props = {
    onSubmit?: FormEventHandler<HTMLFormElement>
    children: React.ReactNode
    className: string
}

export default function Form(props: props) {

    return (
        <form className={"form " + props.className} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    )
}

Form.defaultProps = {
    className: "",
}