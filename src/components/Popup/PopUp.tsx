import { MouseEventHandler } from 'react'
import Button from '../Button/Button'
import Title from '../Title/Title'
import './PopUp.scss'

type props = {
    onClick: MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
}

export default function PopUp(props: props) {

    return (
        <div className="popUp">
            <Button onClick={props.onClick}>zavřít</Button>
            <Title as="h3" className="popUp-text">
                {props.children}
            </Title>
        </div>
    )
}