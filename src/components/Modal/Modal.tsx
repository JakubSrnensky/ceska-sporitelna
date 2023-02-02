
import { MouseEventHandler } from 'react'
import Button from '../../components/Button/Button'
import './Modal.scss'

type props = {
    children: React.ReactNode
    onClickClose: MouseEventHandler<HTMLButtonElement>
}

export default function Modal(props: props) {

    return (
        <div className="modal">
            <div className="modal-container">
                <Button onClick={props.onClickClose}>Zavřit</Button>

                {props.children}
           </div>
        </div>
    )
}