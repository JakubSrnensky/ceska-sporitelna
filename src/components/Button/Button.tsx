import { MouseEventHandler } from 'react'
import './Button.scss'

type props = {
    type?: 'submit'
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
}

export default function Button(props: props ) {
    return (
        <button type={props.type} className={"button " + props.className} onClick={props.onClick}>
            {props.children}
        </button>
    )
}