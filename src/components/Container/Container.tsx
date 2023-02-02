import './Container.scss'

type props = {
    children: React.ReactNode
    className?: string
}

export default function Container(props: props) {
    return (
        <div className={"container " + props.className}>
            {props.children}
        </div>
    )
}


Container.defaultProps = {
    className: "",
}